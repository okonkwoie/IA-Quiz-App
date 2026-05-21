export const quizData = [
  {
    topic: "Purchase Order Timing",
    scenario: "A vendor delivered goods on March 10th 2026. The Purchase Order is dated March 15th 2026.",
    question: "What is wrong?",
    options: [
      "The delivery was too fast",
      "Goods were received before a Purchase Order existed",
      "The vendor delivered to the wrong location",
      "The PO date should match the invoice date"
    ],
    correct: 1
  },
  {
    topic: "Permit to Work",
    scenario: "A work permit was valid from 8am to 12pm. A site photo is timestamped 2:15pm showing welding in progress.",
    question: "What happened?",
    options: [
      "The photo timestamp is wrong",
      "Work continued after the permit expired",
      "The permit window was too short",
      "Photos are not valid audit evidence"
    ],
    correct: 1
  },
  {
    topic: "Standby Days",
    scenario: "A contractor invoiced 8 standby days. The rig activity log shows 5 standby days and 3 operational days.",
    question: "What is the anomaly?",
    options: [
      "The standby rate is too high",
      "3 operational days were billed as standby",
      "The rig activity log is unreliable",
      "8 days standby is within tolerance"
    ],
    correct: 1
  },
  {
    topic: "Bank Account Change",
    scenario: "On April 1st 2026 an employee's salary bank account was changed in the HR system. The employee calls on April 10 saying they never received their salary.",
    question: "What should be checked first?",
    options: [
      "Whether the bank transfer was delayed",
      "Whether the employee's contract is active",
      "Whether the bank account change on April 1 was authorized by the employee",
      "Whether the payroll was processed correctly"
    ],
    correct: 2
  },
  {
    topic: "Invoice Before Purchase Order",
    scenario: "An invoice is dated January 5th 2026. The Purchase Order authorizing the work is dated January 18th 2026.",
    question: "What does this mean?",
    options: [
      "The vendor invoiced too early",
      "Work or supply may have started before it was officially authorized",
      "The Purchase Order date should be corrected",
      "Invoice dates don't always match Purchase Order dates"
    ],
    correct: 1
  },
  {
    topic: "Related Party",
    scenario: "A ₦20 Million contract was awarded to Crest Solutions Ltd. The vendor's registered address is the same as a procurement officer's home address.",
    question: "What is the concern?",
    options: [
      "The contract value is too low",
      "The vendor address may indicate a conflict of interest",
      "Vendor addresses are not relevant to procurement",
      "The procurement officer should have declared the contract"
    ],
    correct: 1
  },
  {
    topic: "After Hours Access",
    scenario: "An SAP S/4 Hana audit log shows a user accessed and edited payroll records at 1:14am on a Sunday. The user is a junior accounts clerk.",
    question: "What raises concern?",
    options: [
      "The ERP should not be accessible on Sundays",
      "Payroll records were accessed and edited at an unusual time by someone whose role doesn't require payroll access",
      "The user was probably working overtime",
      "Audit logs are not always accurate"
    ],
    correct: 1
  },
  {
    topic: "Duplicate Invoice",
    scenario: "Invoice INV-4421 for ₦2.1 Million was paid on February 3rd 2026. The same invoice number and amount appear in the payment run on February 24th 2026.",
    question: "What happened?",
    options: [
      "The vendor resubmitted a corrected invoice",
      "The same invoice was paid twice",
      "February payment runs always have duplicates",
      "₦2.1 Million is within single payment tolerance"
    ],
    correct: 1
  },
  {
    topic: "Bid Award",
    scenario: "Three bids were received: ₦8M, ₦11M, ₦14M. The ₦11M bid was selected. The evaluation note says 'best value.'",
    question: "What is missing?",
    options: [
      "The ₦8M bid should have been selected automatically",
      "'Best value' justification requires documented quality criteria, none are on file",
      "Three bids is not enough for a valid tender",
      "The ₦14M bid should have been disqualified first"
    ],
    correct: 1
  },
  {
    topic: "Year End Journal",
    scenario: "A ₦9M journal entry was posted at 11:57pm on December 31st 2026 by a senior accountant and approved by the same person 2 minutes later.",
    question: "What is suspicious?",
    options: [
      "₦9M is too large for a journal entry",
      "Journal entries cannot be posted after 5pm",
      "A large year-end entry was self-approved in under 2 minutes",
      "The accountant was working late which is commendable"
    ],
    correct: 2
  }
];