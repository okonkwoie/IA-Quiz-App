export const quizData = [
  {
    type: "mcq",
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
    question: "Match each transaction to the correct anomaly. Select a transaction, then select its match. Click on a matched pair to undo it. Goodluck!",
    transactions: [
      { id: "t1", text: "PO raised March 15th. Goods received March 10th." },
      { id: "t2", text: "Invoice #44100 paid Feb 3rd 2026. Same invoice paid again Feb 17th 2026." },
      { id: "t3", text: "Payment of ₦10M initiated and approved by the same officer." },
      { id: "t4", text: "₦50M contract awarded to one vendor. No waiver on file." },
    ],
    anomalies: [
      { id: "a1", text: "Unauthorized procurement", correctFor: "t1" },
      { id: "a2", text: "Duplicate payment", correctFor: "t2" },
      { id: "a3", text: "Maker-checker control failure", correctFor: "t3" },
      { id: "a4", text: "Competitive bidding bypassed", correctFor: "t4" },
    ]
  },
  {
    type: "mcq",
    scenario: "During a Long Lead Item Audit, an auditor was given a spool containing a population of 2,347 casings and valves to test. Instead of testing all, the auditor selects only the casings and valves with a unit price above $100,000.",
    question: "Which sampling method has the auditor applied?",
    options: [
      "Systematic sampling",
      "Targeted sampling",
      "Stratified sampling",
      "Random sampling"
    ],
    correct: 1
  }
];