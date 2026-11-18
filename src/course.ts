export type CourseModule = {
  id: number;
  title: string;
  summary: string;
  theme: string;
  minutes: number;
  outcome: string;
  lessons: { title: string; text: string }[];
  caseStudy: { title: string; text: string };
  activity: {
    title: string;
    scenario: string;
    steps: string[];
    reflection: string;
  };
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
};

export const courseModules: CourseModule[] = [
  {
    id: 1,
    title: "What is artificial intelligence?",
    summary: "The big ideas behind AI, without the technical jargon.",
    theme: "AI fundamentals",
    minutes: 45,
    outcome:
      "Explain AI in everyday language and tell it apart from ordinary automation.",
    lessons: [
      {
        title: "Start with a familiar example",
        text: "When your email app spots a message that looks like spam, it is making a prediction. It looks for patterns that resemble examples it has seen before. Artificial intelligence is a broad name for computer systems that perform tasks such as recognizing images, understanding speech, making predictions, or generating text. A system can be useful at one of these tasks without thinking or understanding like a person.",
      },
      {
        title: "A rule is not the same as a prediction",
        text: "A timer switches a lamp on at 7 p.m. because someone wrote that exact rule. A spam filter trained on examples estimates whether a new email belongs in your junk folder. Both automate work, but the second uses machine learning. Many everyday products combine fixed rules with learned patterns. Not every product with a digital screen needs AI.",
      },
      {
        title: "A simple map of the terminology",
        text: "Think of AI as a large umbrella. Machine learning is one approach under it: learning patterns from examples rather than specifying every rule. Deep learning is a type of machine learning that uses many layers of calculation. Generative AI describes systems that create new content, such as a draft email or an image, using patterns learned during training.",
      },
    ],
    caseStudy: {
      title: "Two ways to sort an inbox",
      text: "A rule moves every message from your book club into a folder. A learned filter notices that a new message resembles past spam. The rule is predictable but narrow; the filter can recognize unfamiliar examples, but may also make mistakes. Checking the junk folder is a simple example of human oversight.",
    },
    activity: {
      title: "Go on an everyday AI safari",
      scenario:
        "No account or special software needed. Explore the devices and services you already use.",
      steps: [
        "List five digital tasks from your day, such as setting an alarm, searching for a photo, or receiving a recommendation.",
        'For each one, decide whether it follows a fixed rule, predicts from examples, or might do both. Mark uncertain examples as "not enough information."',
        "Choose one example and explain it to a friend in two sentences. Include one way it could get things wrong.",
      ],
      reflection:
        "Which everyday task uses AI, and what makes it different from a fixed rule?",
    },
    quiz: {
      question: "Which example most clearly uses machine learning?",
      options: [
        "A lamp that turns on at exactly 7 p.m.",
        "A filter that learns to recognize spam from labeled emails.",
        "A calculator that adds two numbers.",
      ],
      answer: 1,
      explanation:
        "The spam filter learns patterns from examples. A timer and basic calculator follow rules written explicitly by people.",
    },
  },
  {
    id: 2,
    title: "How machines learn",
    summary:
      "Explore the relationship between data, patterns, and predictions.",
    theme: "Data & learning",
    minutes: 60,
    outcome:
      "Describe how examples shape a model and why its predictions can be wrong.",
    lessons: [
      {
        title: "Examples are the starting point",
        text: "Imagine teaching someone to sort fruit with a basket of labeled examples. They notice shapes, colors, and textures. Supervised learning has a similar structure: a system sees inputs paired with labels, then adjusts its internal settings to make better predictions. Other approaches find patterns without labels. The examples a system learns from are called its training data.",
      },
      {
        title: "Training and using are different",
        text: "A model is the pattern-finding system produced by training. Once trained, it can make a prediction about a new example; this is called inference. Asking a model a question is not the same as retraining it. A tool may use earlier messages as temporary context, but that does not necessarily mean its underlying model has changed.",
      },
      {
        title: "Test on something genuinely new",
        text: "A system that memorizes a practice test may still struggle with a new question. That is why people evaluate models on examples not used during training. The test should resemble real conditions, including unusual cases. A high overall score can hide poor results for a smaller group, so it matters which examples you check.",
      },
    ],
    caseStudy: {
      title: "The fruit sorter and the green apple",
      text: "A shop trains a fruit sorter using only red apples and yellow bananas. The sorter appears accurate until a green apple arrives. It may have learned color rather than shape. Adding varied examples and testing on a separate basket gives the shop a better picture of the system's limits.",
    },
    activity: {
      title: "Be the model",
      scenario:
        "Use paper to explore how a small set of examples can teach the wrong lesson.",
      steps: [
        'Write down three red apples labeled "apple" and three yellow bananas labeled "banana." Make a rule that predicts the label using color alone.',
        "Test your rule on a green apple, a red banana, and a yellow apple. Record which predictions fail.",
        "Redesign your examples to include different colors, shapes, and conditions. Reserve three new examples to test your improved rule.",
      ],
      reflection:
        "What was missing from your first set of examples, and how did that affect the result?",
    },
    quiz: {
      question:
        "What is the best way to check whether a fruit sorter works well?",
      options: [
        "Test it only on the fruit used during training.",
        "Use more complicated words to describe it.",
        "Test it on varied, previously unseen fruit.",
      ],
      answer: 2,
      explanation:
        "New, representative examples test whether the model can apply its patterns beyond the training set.",
    },
  },
  {
    id: 3,
    title: "Getting to know generative AI",
    summary: "Meet creative AI tools and learn the art of a useful prompt.",
    theme: "Tools & prompting",
    minutes: 60,
    outcome:
      "Write a clear prompt, refine a draft, and check the result against a source.",
    lessons: [
      {
        title: "From predicting to creating",
        text: "A language model generates text in small pieces called tokens, choosing each next piece based on context. The result can sound convincing even when it is incorrect. Image generators also learn patterns, but create visual content. Multimodal tools can work with more than one kind of information, such as an image and a written question about it.",
      },
      {
        title: "Give the task a useful shape",
        text: 'A prompt is your instruction to an AI tool. A useful starting structure is task, context, constraints, and format. Instead of "write something," try "Turn the supplied event notes into a friendly, three-sentence invitation for first-time visitors. Use only the facts in the notes." You do not need magic words. Clear expectations matter more than elaborate instructions.',
      },
      {
        title: "Treat the answer as a first draft",
        text: "Ask for a shorter version, a different tone, or an explanation of an assumption. Then compare factual claims with a trusted source. AI can invent details and even references, sometimes called hallucinations. Asking the same model to confirm itself is not an independent check. You remain responsible for what you share.",
      },
    ],
    caseStudy: {
      title: "A community garden invitation",
      text: 'Source notes: "Garden open day. Saturday, 10 a.m. Bring water. Entry is free." A draft adds "free lunch included." It sounds welcoming, but lunch was never promised. A good review keeps the useful wording and removes the unsupported detail.',
    },
    activity: {
      title: "Write, compare, refine",
      scenario:
        "Use the garden notes above with a chat assistant, or complete the same exercise on paper. Never use private information.",
      steps: [
        "Draft an instruction that names the audience, task, format, and the facts the answer must use.",
        'Compare this sample output with the source: "Join us Saturday at 10 a.m. for a free garden visit and lunch. Bring water!" Mark every supported and unsupported claim.',
        "Revise the invitation and your prompt. Compare the two drafts for accuracy, clarity, and tone.",
      ],
      reflection:
        "Save your improved prompt and one factual check you would make before sharing the answer.",
    },
    quiz: {
      question:
        "An AI-written invitation includes a detail missing from your source. What should you do?",
      options: [
        "Verify it independently or remove it before sharing.",
        "Keep it because the writing sounds confident.",
        "Ask the assistant to repeat the claim three times.",
      ],
      answer: 0,
      explanation:
        "Fluent writing is not evidence. An independent source or the event organizer can verify the detail; otherwise, leave it out.",
    },
  },
  {
    id: 4,
    title: "AI in everyday work",
    summary: "Find practical uses in business, creativity, and daily life.",
    theme: "Real-world applications",
    minutes: 75,
    outcome:
      "Identify a useful, low-risk AI opportunity and define a measure of success.",
    lessons: [
      {
        title: "Start with a task, not a tool",
        text: "Look for small, repeated tasks with a clear input and an output you can judge. A shop might group anonymous feedback into themes. A teacher might brainstorm examples for a lesson. A community organizer might draft a public event notice. Each use case works best when a person can spot mistakes and decide what to do next.",
      },
      {
        title: "Draw a simple workflow",
        text: "A workflow is just a series of steps. Write down what goes in, what the tool does, who reviews it, and where the result goes. For a customer reply: remove private details, use approved policy as the source, generate a draft, and ask an employee to review it before sending. An assistant can support a decision without being allowed to make it.",
      },
      {
        title: "Measure the whole job",
        text: "A fast first draft is not necessarily a faster finished task. Compare the time spent preparing inputs, reviewing errors, and correcting the result with the original process. Also check quality, accessibility, privacy, and costs. A useful pilot has a baseline, a small test, a clear success measure, and a reason to stop if it does not help.",
      },
    ],
    caseStudy: {
      title: "A small shop tests reply drafting",
      text: "A fictional shop normally spends 12 minutes writing a reply. Its AI draft takes 2 minutes, but fact-checking takes 8 more. The real saving is 2 minutes, not 10. The team tests several ordinary inquiries and reviews accuracy before deciding whether to continue.",
    },
    activity: {
      title: "Map one useful opportunity",
      scenario:
        "Choose a low-stakes task from home, study, or work. A public event announcement is a good first example.",
      steps: [
        "Describe the task today, who does it, and what a good result looks like. Estimate a baseline time or quality score.",
        "Draw four steps: prepare safe inputs, create a draft, review it, and use the approved result. Name the human reviewer.",
        "Compare two approaches on three fictional examples. Record total time and factual errors, then decide whether the tool helped.",
      ],
      reflection:
        "What would your pilot improve, and what evidence would make you stop using it?",
    },
    quiz: {
      question:
        "Which measure gives the fairest picture of a drafting assistant's value?",
      options: [
        "The number of words it produces.",
        "Total time and quality after a person reviews the draft.",
        "How quickly the first sentence appears.",
      ],
      answer: 1,
      explanation:
        "A useful comparison includes the full workflow, including checking and revision, and the quality of the finished result.",
    },
  },
  {
    id: 5,
    title: "Using AI responsibly",
    summary: "Navigate bias, privacy, and the importance of human judgment.",
    theme: "Risks & ethics",
    minutes: 60,
    outcome:
      "Apply a practical checklist for privacy, fairness, accuracy, and transparency.",
    lessons: [
      {
        title: "Pause before you paste",
        text: "Do not put passwords, private messages, personal records, or confidential business details into an AI service without proper authorization. Removing a name may not be enough: a combination of details can still identify someone. Use fictional examples for practice, review the service's data policies, and follow your organization's rules.",
      },
      {
        title: "Ask who might be left out",
        text: "Bias is a systematic pattern of unfair results. Historical data can reflect unequal treatment, and missing examples can make some groups less well served. Evaluate outcomes for different people and situations, not just an average. High-stakes decisions about hiring, health, or lending need qualified oversight and appropriate safeguards, not an unchecked chatbot recommendation.",
      },
      {
        title: "Make responsibility visible",
        text: "Check important facts, confirm that you have permission to use source material, and disclose AI assistance when appropriate. Generated content is not automatically free of copyright or privacy concerns. A human owner should be able to explain a decision, correct an error, and offer a way to challenge the result.",
      },
    ],
    caseStudy: {
      title: "The uneven customer survey",
      text: "A team summarizes feedback gathered only through its smartphone app. The summary says customers find the app easy to use, but it misses people who could not use it at all. The remedy is not just a better prompt: collect accessible feedback through other channels and note the limitation.",
    },
    activity: {
      title: "Run a four-question review",
      scenario:
        "A fictional club wants to paste its full membership spreadsheet into a public chatbot to plan activities.",
      steps: [
        "Privacy: identify personal information that is unnecessary. Replace the spreadsheet with a small fictional set of interests.",
        "Fairness and accuracy: list one group that may be missing and one claim that needs independent checking.",
        "Accountability: choose a reviewer, describe how members can correct errors, and write one sentence explaining the use of AI.",
      ],
      reflection:
        "Write your own before-I-share checklist: one check each for privacy, fairness, accuracy, and transparency.",
    },
    quiz: {
      question:
        "What is the safest starting point for a beginner practice exercise?",
      options: [
        "A colleague's private messages with the name removed.",
        "An unapproved customer spreadsheet.",
        "Fictional examples created specifically for practice.",
      ],
      answer: 2,
      explanation:
        "Fictional examples avoid exposing real people's information. Removing a name alone may not prevent identification.",
    },
  },
  {
    id: 6,
    title: "Your first AI project",
    summary: "Bring it all together with a small, real-world experiment.",
    theme: "Practice & next steps",
    minutes: 60,
    outcome:
      "Plan, test, and explain a small AI-assisted project with human review.",
    lessons: [
      {
        title: "Build a one-page project brief",
        text: "Choose one reversible, low-risk task with a clear audience. Define what you want to improve, what information you can safely use, and what a good result looks like. Keep the scope small enough to try in one sitting. A brief is useful even if you later decide a simple template works better than AI.",
      },
      {
        title: "Try it, check it, document it",
        text: "Begin with a baseline made without AI. Run the same task with an assistant or the provided sample draft, using fictional inputs. Compare accuracy, usefulness, and total effort. Record the prompt, what you changed, and why. Include at least one example where the approach does not work well. A useful project explains limits as clearly as successes.",
      },
      {
        title: "Know what to explore next",
        text: "Multimodal tools combine text, images, or sound. On-device AI runs some processing on your own device. AI agents can take steps using other tools, which makes permissions and human approval especially important. Developers may use frameworks such as PyTorch or TensorFlow to build models. You do not need to learn these frameworks to use AI thoughtfully.",
      },
    ],
    caseStudy: {
      title: "A clear, checkable event notice",
      text: "A learner turns public event notes into a plain-language notice. They compare a handwritten version with an assisted draft, remove an invented detail, and ask a friend to check the result. Their project is not just the final notice: it is the documented process for deciding whether the tool helped.",
    },
    activity: {
      title: "Make your first project brief",
      scenario:
        "Create a one-page record you can share with a friend, colleague, or future you.",
      steps: [
        "Set a goal, audience, safe input, and success measure. For a no-account option, reuse the garden notes and sample draft from Module 03.",
        "Make a baseline, compare it with an assisted draft, and document at least two checks and one revision.",
        "Score accuracy, usefulness, and effort from 1 to 3 for both versions. Write a go, revise, or stop decision, with one next step for the coming week.",
      ],
      reflection:
        "Save your project brief: goal, safe input, approach, comparison, human review, and next step.",
    },
    quiz: {
      question: "What makes a beginner AI pilot ready for a small trial?",
      options: [
        "A clear goal, safe examples, human review, and a success measure.",
        "A promise that the model never makes mistakes.",
        "Permission to automate every decision immediately.",
      ],
      answer: 0,
      explanation:
        "A manageable scope and clear checks let you learn safely. A pilot should make it easy to discover limitations and stop if needed.",
    },
  },
];

export type ResourceCategory = "AI tools" | "Frameworks" | "Further learning";
export type Resource = {
  id: string;
  title: string;
  provider: string;
  category: ResourceCategory;
  description: string;
  url: string;
};

export const resources: Resource[] = [
  {
    id: "chatgpt",
    title: "ChatGPT",
    provider: "OpenAI",
    category: "AI tools",
    description:
      "A conversational assistant for drafting, brainstorming, and explaining ideas. Try a simple prompt with fictional information, then check the answer.",
    url: "https://chatgpt.com/",
  },
  {
    id: "teachable-machine",
    title: "Teachable Machine",
    provider: "Google",
    category: "AI tools",
    description:
      "See learning from examples in action. Experiment with an image, sound, or pose classifier in your browser, without writing code.",
    url: "https://teachablemachine.withgoogle.com/",
  },
  {
    id: "firefly",
    title: "Adobe Firefly",
    provider: "Adobe",
    category: "AI tools",
    description:
      "Explore how written descriptions can create and edit images. Compare prompts and check usage terms before publishing your work.",
    url: "https://firefly.adobe.com/",
  },
  {
    id: "gemini",
    title: "Gemini",
    provider: "Google",
    category: "AI tools",
    description:
      "Explore a multimodal assistant that can work with text and images. Try describing a public-domain picture and compare its answer with what you see.",
    url: "https://gemini.google.com/",
  },
  {
    id: "pytorch",
    title: "PyTorch",
    provider: "PyTorch Foundation",
    category: "Frameworks",
    description:
      "A toolkit developers use to build and train learning models. Recognize its role behind the scenes; learning to code is not part of this course.",
    url: "https://pytorch.org/",
  },
  {
    id: "tensorflow",
    title: "TensorFlow",
    provider: "Google",
    category: "Frameworks",
    description:
      "A framework for creating and deploying machine learning models. Explore the project overview to connect the vocabulary with real technology.",
    url: "https://www.tensorflow.org/",
  },
  {
    id: "elements",
    title: "Elements of AI",
    provider: "University of Helsinki & MinnaLearn",
    category: "Further learning",
    description:
      "Go deeper with an approachable introduction to AI, reasoning, and machine learning. A good next course for curious non-programmers.",
    url: "https://www.elementsofai.com/",
  },
  {
    id: "google-essentials",
    title: "Google AI Essentials",
    provider: "Google",
    category: "Further learning",
    description:
      "Continue with workplace exercises and an optional paid course leading to a Google completion certificate. Check current enrollment terms and pricing.",
    url: "https://grow.google/ai-essentials/",
  },
  {
    id: "people-ai",
    title: "People + AI Guidebook",
    provider: "Google PAIR",
    category: "Further learning",
    description:
      "Practical guidance for putting people first in AI products. Use its questions to plan a small pilot, set expectations, and design human review.",
    url: "https://pair.withgoogle.com/guidebook/",
  },
];

export const glossary = [
  [
    "Algorithm",
    "A set of steps for solving a problem or completing a task. An algorithm does not have to involve AI.",
  ],
  [
    "Model",
    "A system that uses learned patterns to make predictions or generate content.",
  ],
  [
    "Training",
    "The process of adjusting a model using examples so that it performs a task better.",
  ],
  [
    "Prompt",
    "The instruction, question, and context you give to a generative AI tool.",
  ],
  [
    "Hallucination",
    "An AI-generated statement that sounds plausible but is false or unsupported.",
  ],
  [
    "Bias",
    "A systematic pattern in data or a system's results that can lead to unfair outcomes.",
  ],
  [
    "Multimodal AI",
    "A system that can work with more than one kind of input or output, such as text, images, and audio.",
  ],
  [
    "AI agent",
    "A system that can take a sequence of actions using tools to pursue a goal. Its permissions and review steps matter.",
  ],
];

export const courseObjective =
  "Understand how AI works, recognize its everyday uses, and build the confidence to use it thoughtfully and responsibly.";
export const audience =
  "For curious beginners, students, and working professionals. If you can browse the web, you have everything you need. No coding, advanced math, or AI experience required.";

export function downloadText(filename: string, text: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
