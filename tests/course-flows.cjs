const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const { PDFDocument } = require("pdf-lib");
const url = process.env.TEST_URL || "http://localhost:5173";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
    reducedMotion: "reduce",
  });
  page.setDefaultTimeout(6500);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(await page.locator("h1").innerText(), "AI Foundations");
  assert(
    await page
      .locator(".hero-art img")
      .evaluate((i) => i.complete && i.naturalWidth > 0),
  );
  await page.getByRole("button", { name: "Explore curriculum" }).click();
  assert(
    await page
      .locator("#course-outline")
      .evaluate((e) => Math.abs(e.getBoundingClientRect().top) < 30),
  );
  await page.locator(".module-toggle").nth(1).click();
  assert.equal(
    await page.locator(".module-toggle").nth(1).getAttribute("aria-expanded"),
    "true",
  );
  assert(
    await page
      .locator("#outline-2")
      .innerText()
      .then((s) => s.includes("Be the model")),
  );
  await page.locator(".module-toggle").nth(1).click();
  const [guide] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download syllabus" }).click(),
  ]);
  assert(guide.suggestedFilename().endsWith(".pdf"));
  const doc = await PDFDocument.load(fs.readFileSync(await guide.path()));
  assert.equal(doc.getPageCount(), 10);
  console.log("PASS overview, expandable outline, and valid 10-page PDF");
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Curriculum", exact: true })
    .click();
  await page.locator("#outline-1").waitFor();
  assert.equal(await page.locator(".week-list > li").count(), 3);
  assert.equal(await page.locator(".module-toggle").count(), 6);
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Resources" })
    .click();
  await page.locator(".resource-row").first().waitFor();
  assert.equal(await page.locator(".resource-row").count(), 9);
  await page.getByRole("button", { name: "Frameworks", exact: true }).click();
  assert.equal(await page.locator(".resource-row").count(), 2);
  await page
    .getByRole("button", { name: "Further learning", exact: true })
    .click();
  assert.equal(await page.locator(".resource-row").count(), 3);
  await page
    .getByRole("textbox", { name: "Find a resource" })
    .fill("unmatched-test-string");
  await page.getByRole("heading", { name: "No matching resources" }).waitFor();
  await page.getByRole("button", { name: "Show all resources" }).click();
  await page
    .getByRole("textbox", { name: "Find a resource" })
    .fill("Teachable");
  assert.equal(await page.locator(".resource-row").count(), 1);
  await page
    .getByRole("button", { name: "Save Teachable Machine", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Unsave Teachable Machine" })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("button", { name: "Clear search" }).click();
  await page
    .locator(".glossary-list summary")
    .filter({ hasText: "Algorithm" })
    .click();
  assert(
    await page
      .locator(".glossary-list details[open]")
      .innerText()
      .then((s) => s.includes("set of steps")),
  );
  console.log(
    "PASS curriculum, resource filters, search, bookmarks, and glossary",
  );
  await page.getByRole("button", { name: "My notebook", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "My notebook" });
  await dialog.waitFor();
  await dialog.getByRole("button", { name: "Saved resources 1" }).click();
  assert(
    await dialog.getByRole("link", { name: "Teachable Machine" }).isVisible(),
  );
  await dialog.getByRole("button", { name: "Field notes 0" }).click();
  await dialog
    .locator("textarea")
    .fill("My first reflection: check the source.");
  await dialog.getByRole("button", { name: "Save note", exact: true }).click();
  assert.equal(await dialog.locator(".saved-note").count(), 1);
  await dialog.getByRole("button", { name: /Edit note:/ }).click();
  await dialog
    .locator("textarea")
    .fill("Check the source and keep a human reviewer.");
  await dialog.getByRole("button", { name: "Save changes" }).click();
  assert.equal(
    await dialog.locator(".saved-note > p").innerText(),
    "Check the source and keep a human reviewer.",
  );
  await dialog.getByRole("button", { name: /Delete note:/ }).click();
  await dialog.getByRole("button", { name: "Keep", exact: true }).click();
  assert.equal(await dialog.locator(".saved-note").count(), 1);
  const [exported] = await Promise.all([
    page.waitForEvent("download"),
    dialog.getByRole("button", { name: "Export notebook" }).click(),
  ]);
  const exportedText = fs.readFileSync(await exported.path(), "utf8");
  assert(exportedText.includes("Check the source and keep a human reviewer."));
  assert(exportedText.includes("Teachable Machine"));
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog").count(), 0);
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "My notebook", exact: true }).click();
  assert.equal(await dialog.locator(".saved-note").count(), 1);
  await dialog.getByRole("button", { name: /Delete note:/ }).click();
  await dialog.getByRole("button", { name: "Delete", exact: true }).click();
  assert.equal(await dialog.locator(".saved-note").count(), 0);
  await dialog.getByRole("button", { name: "Saved resources 1" }).click();
  await dialog.getByRole("button", { name: "Remove bookmark" }).click();
  assert(
    await dialog
      .getByRole("heading", { name: "Your reference collection" })
      .isVisible(),
  );
  await dialog.getByRole("button", { name: "Close notebook" }).click();
  console.log(
    "PASS notebook creation, editing, persistence, export, deletion, and unbookmarking",
  );
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Course overview" })
    .click();
  await page.getByRole("link", { name: "Start learning", exact: true }).click();
  await page.waitForURL("**/#module/1");
  await page.getByRole("button", { name: "Try the exercise" }).click();
  await page
    .locator("#module-reflection")
    .fill("Our email filter learns from examples, unlike a timer.");
  await page
    .getByRole("button", { name: "Save to notebook", exact: true })
    .click();
  assert(
    await page.getByRole("button", { name: "Saved to notebook" }).isDisabled(),
  );
  await page.getByRole("button", { name: "Take the quick check" }).click();
  assert(
    await page.getByRole("button", { name: "Check my answer" }).isDisabled(),
  );
  await page.locator(".quiz-option").nth(0).click();
  await page.getByRole("button", { name: "Check my answer" }).click();
  assert(await page.locator(".quiz-feedback.try-again").isVisible());
  await page.locator(".quiz-option").nth(1).click();
  await page.getByRole("button", { name: "Check my answer" }).click();
  assert(await page.locator(".quiz-feedback.good").isVisible());
  await page.getByRole("button", { name: "Complete module" }).click();
  await page.waitForURL("**/#module/2");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("fieldwork:completed")).length,
    ),
    1,
  );
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Course overview" })
    .click();
  await page
    .getByRole("link", { name: "Continue learning", exact: true })
    .click();
  await page.waitForURL("**/#module/2");
  for (const [id, answer] of [
    [2, 2],
    [3, 0],
    [4, 1],
    [5, 2],
    [6, 0],
  ]) {
    await page
      .locator(".reader-tabs")
      .getByRole("button", { name: /Quick check/ })
      .click();
    await page.locator(".quiz-option").nth(answer).click();
    await page.getByRole("button", { name: "Check my answer" }).click();
    await page.getByRole("button", { name: "Complete module" }).click();
    await page.waitForURL(id === 6 ? "**/#progress" : `**/#module/${id + 1}`);
  }
  await page
    .getByRole("heading", { name: "A strong foundation.", exact: true })
    .waitFor();
  assert.equal(await page.locator("h1").innerText(), "A strong foundation.");
  assert.equal(await page.locator(".completed-text").count(), 6);
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Course overview" })
    .click();
  await page.getByRole("link", { name: "View your progress" }).waitFor();
  console.log(
    "PASS all six knowledge checks, retry feedback, saved reflection, resume, and completion",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Curriculum", exact: true })
    .click();
  await page.waitForURL("**/#curriculum");
  assert.equal(await page.locator("#mobile-navigation").count(), 0);
  await page
    .locator("#outline-1")
    .getByRole("link", { name: "Revisit module" })
    .click();
  await page.getByRole("button", { name: "Course contents" }).click();
  await page.locator(".lesson-nav-item").nth(3).click();
  await page.waitForURL("**/#module/4");
  await page.getByRole("button", { name: "My notebook", exact: true }).click();
  assert(
    await dialog
      .locator(".saved-note")
      .innerText()
      .then((s) => s.includes("Our email filter")),
  );
  await dialog.getByRole("button", { name: "Close notebook" }).click();
  for (const w of [320, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const path of [
      "overview",
      "resources",
      "curriculum",
      "module/3",
      "progress",
    ]) {
      await page.goto(`${url}/#${path}`);
      await page.waitForTimeout(30);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Overflow on ${path} at ${w}`,
      );
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS mobile navigation, module switching, and 30 responsive page checks",
  );
  console.log("PASS no browser runtime or console errors");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
