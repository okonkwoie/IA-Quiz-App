export const quizData = [
  {
    type: "mcq",
    topic: "",
    scenario: "A disgruntled HR officer exports the entire company payroll report, including salaries, bank account numbers and performance ratings and shares it with colleagues via a WhatsApp group before resigning.",
    question: "Which element of the CIA Triad was violated?",
    options: [
      "Availability",
      "Integrity",
      "Confidentiality",
      "Authentication"
    ],
    correct: 2
  },
  {
    type: "match",
    topic: "",
    question: "Match each transaction to its anomaly.",
    transactions: [
      { id: "t1", text: "PO raised March 15th 2026. Goods received March 10th 2026." },
      { id: "t2", text: "Invoice #44100 paid Feb 3rd 2026. Same invoice paid again Feb 17th 2026." },
      { id: "t3", text: "Payment of ₦10M initiated and approved by the same officer." },
      { id: "t4", text: "₦50M contract awarded to one vendor. No waiver on file." },
    ],
    anomalies: [
      { id: "a1", text: "Competitive bidding bypassed", correctFor: "t4" },
      { id: "a2", text: "Maker-checker control failure", correctFor: "t3" },
      { id: "a3", text: "Unauthorized procurement", correctFor: "t1" },
      { id: "a4", text: "Duplicate payment", correctFor: "t2" },
    ]
  },
  {
    type: "mcq",
    topic: "",
    scenario: "During a Long Lead Item Audit, an auditor was given a spool containing a population of 2,347 casings and valves to test. Instead of testing all, the auditor selects only the casings and valves with a unit price above $100,000.",
    question: "Which sampling method has the auditor applied?",
    options: [
      "Systematic sampling",
      "Targeted sampling",
      "Stratified sampling",
      "Random sampling"
    ],
    correct: 1
  },
  {
    type: "mcq",
    topic: "",
    scenario: "A production system goes down briefly during working hours and a developer applies a direct fix in production to restore service quickly. The system works again, but the change was not approved or logged anywhere.",
    question: "What control was bypassed?",
    options: [
      "Incident management",
      "Problem management",
      "Change management",
      "Release management"
    ],
    correct: 2
  },
  {
    type: "drag",
    topic: "",
    question: "Drag each control into the correct category.",
    categories: [
      { id: "cat1", label: "Preventive Control" },
      { id: "cat2", label: "Detective Control" }
    ],
    cards: [
      { id: "c1", text: "Payment requires manager approval", correctCategory: "cat1" },
      { id: "c2", text: "Employee password / Multi-Factor Authentication", correctCategory: "cat1" },
      { id: "c3", text: "Spending limit on company cards", correctCategory: "cat1" },
      { id: "c4", text: "Review of failed login attempts", correctCategory: "cat2" },
      { id: "c5", text: "Contract compliance review", correctCategory: "cat2" },
      { id: "c6", text: "Payroll reconciliation", correctCategory: "cat2" },
    ]
  },
  {
    type: "mcq",
    topic: "",
    scenario: "The Internal Audit department of a company has been operating for 3 years. The Chief Audit Executive recently requested access to review the IT department's systems and data. The IT Director refused, stating that Internal Audit has no authority over IT systems.",
    question: "What document should the CAE reference to resolve this dispute?",
    options: [
      "The Company's IT policy",
      "The Audit Charter",
      "The External auditor's report",
      "The IIA Standards"
    ],
    correct: 1
  },
  {
    type: "spotlight",
    topic: "",
    question: "Thoroughly go through the active staff list and identify the anomaly on the user access log.",
    image: "/useraccess-log.png",
    hotspots: [
      { id: "j.smith",   label: "j.smith",   top: "43%" },
      { id: "m.okafor",  label: "m.okafor",  top: "53%" },
      { id: "t.brown",   label: "t.brown",   top: "63%" },
      { id: "a.johnson", label: "a.johnson", top: "73%" },
      { id: "s.lee",     label: "s.lee",     top: "83%" },
    ],
    staffList: {
      title: "123 Limited Active Staff List — May 2026",
      headers: ["Staff ID", "Name", "Department", "Status"],
      rows: [
        ["EMP-001", "John Smith",  "Finance",     "Active"],
        ["EMP-002", "Mary Okafor", "Procurement", "Active"],
        ["EMP-003", "Tom Brown",   "IT",          "Active"],
        ["EMP-004", "Sarah Lee",   "HR",          "Active"],
      ]
    },
    correct: "a.johnson"
  },
  {
    type: "mcq",
    topic: "",
    scenario: "During a warehouse inventory update process, the IT system allowed the inventory manager to input negative values (e.g., -20 units) without any warning or restriction.",
    question: "What is the most likely control weakness in this system?",
    options: [
      "Network Control",
      "Input validation Control",
      "Backup Control",
      "General IT Control"
    ],
    correct: 1
  },
  {
    type: "mcq",
    topic: "",
    scenario: "In a follow-up audit, management has implemented corrective actions after previous audit findings were raised. The auditor is now reviewing whether the agreed actions have been properly implemented and are effectively resolving the issues identified.",
    question: "What is this additional control called?",
    options: [
      "Re-perform the original audit in full",
      "Confirm whether audit findings have been adequately remediated",
      "Assign new audit ratings to the department",
      "Identify unrelated control weaknesses"
    ],
    correct: 1
  },
  {
    type: "sequence",
    topic: "",
    question: "You are a new auditor assigned to perform a user access audit on 123 Limited's IT System. For your learning, your manager asks you what you think the audit lifecycle sequence should be. Show your manager you are no newbie!",
    items: [
      { id: "s1", text: "Audit Planning", order: 1 },
      { id: "s2", text: "Risk Assessment", order: 2 },
      { id: "s3", text: "Audit Program Development", order: 3 },
      { id: "s4", text: "Fieldwork / Testing", order: 4 },
      { id: "s5", text: "Reporting", order: 5 },
      { id: "s6", text: "Remediation / Follow-up", order: 6 },
    ]
  }
];