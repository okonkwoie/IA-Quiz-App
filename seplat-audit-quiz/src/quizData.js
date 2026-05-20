export const quizData = [
  {
    id: 1,
    category: "Procurement",
    scenario: `A Purchase Order for drilling chemicals was raised on March 15 for ₦42,000,000. The Goods Receipt Note is dated March 10, five days before the PO was issued. The invoice arrived March 20 and was approved the same day by the same officer who raised the PO.`,
    question: "How many anomalies can you spot in this scenario?",
    options: [
      "The self-approval of the invoice",
      "Goods Receipt Note predates Purchase Order, and self-approval",
      "Goods Receipt Note predates Purchase Order, self-approval, and same-day approval",
      "No anomalies, this is standard practice"
    ],
    correct: 1,
    explanation: "Two clear red flags: (1) The GRN is dated March 10 but the PO wasn't raised until March 15, goods cannot be received before a PO exists. (2) The same officer who raised the PO also approved the invoice, a segregation of duties violation."
  },
  {
    id: 2,
    category: "Marine Operations",
    scenario: `A vessel's Safe Manning Certificate shows a minimum crew requirement of 12. During an offshore operation, the crew manifest logged only 9 personnel on board. The vessel master signed off the departure checklist as 'compliant'. The NIMASA endorsement on file expired 3 months prior.`,
    question: "What is the most critical risk in this scenario?",
    options: [
      "The master falsely certified compliance",
      "The vessel sailed below minimum safe manning",
      "The expired NIMASA endorsement",
      "All three represent critical risks of equal severity"
    ],
    correct: 3,
    explanation: "All three are critical: sailing below Safe Manning Certificate requirements is a regulatory and safety violation; the master's false certification is fraud; and an expired NIMASA endorsement means the vessel was operating without valid regulatory authority. No single issue outranks the others — a good auditor flags all three."
  },
  {
    id: 3,
    category: "Payments & Invoicing",
    scenario: `An invoice for catering services worth ₦8,500,000 was submitted by Vendor A. A search of the payment register shows a near-identical invoice, same amount, same service description, same period, was paid to Vendor A exactly 30 days earlier. The current invoice has a different invoice number.`,
    question: "What type of fraud risk does this scenario represent?",
    options: [
      "Ghost vendor scheme",
      "Duplicate payment attempt",
      "Invoice splitting to avoid approval threshold",
      "Fictitious vendor scheme"
    ],
    correct: 1,
    explanation: "This is a classic duplicate payment attempt. A different invoice number is used to disguise what is essentially the same claim. The matching amount, vendor, description, and period are the giveaways. Controls to catch this include duplicate payment analytics and three-way match reviews."
  },
  {
    id: 4,
    category: "Contract Compliance",
    scenario: `A contract for waste management services has a defined scope covering only onshore locations. An invoice submitted under this contract includes line items for offshore waste disposal at three terminals. The total invoiced is within the contract value ceiling, so it passed the automated payment threshold check.`,
    question: "What control failure does this highlight?",
    options: [
      "The contract value ceiling is too high",
      "Scope creep: services billed outside contract scope",
      "The vendor is not pre-qualified for offshore work",
      "There is no anomaly, contract value was not exceeded"
    ],
    correct: 1,
    explanation: "Passing a value threshold check does not mean a payment is valid. The invoice bills for services outside the contract's defined scope. This is scope creep — a common and often overlooked control gap where automated checks focus on amount but not on whether the service rendered matches what was contracted."
  },
  {
    id: 5,
    category: "Inventory & Assets",
    scenario: `A Long Lead Item (valve assembly) worth $280,000 was received and logged into the EAM system on April 2. A physical verification conducted on April 30 could not locate the item in the warehouse. The Goods Receipt Note was signed by a store officer who resigned on April 10. No incident report was filed.`,
    question: "Which combination of risks is present here?",
    options: [
      "Inventory loss and inadequate access controls",
      "Fictitious receipt, possible misappropriation, and no incident reporting",
      "Only a record-keeping error, items are often miscategorized",
      "Vendor fraud: the item was never delivered"
    ],
    correct: 1,
    explanation: "Multiple risks converge: the item may never have been received (fictitious GRN), or was received and misappropriated. The signing officer's quick resignation is a red flag. The failure to file an incident report when a $280,000 asset goes missing represents a serious control breakdown and possible concealment."
  },
  {
    id: 6,
    category: "Pilotage & Marine Billing",
    scenario: `A pilotage invoice covers services on June 14. The accompanying Vessel Traffic Verification Form (VTVF) shows the vessel departed port at 03:00 on June 14. The Pilotage Chit records the pilot boarding time as 07:30 on June 14, over 4 hours after the vessel had already departed.`,
    question: "What is the primary audit finding here?",
    options: [
      "The invoice date does not match the VTVF",
      "The pilot boarded after the vessel had already departed, the service could not have been rendered",
      "Pilotage chits are unreliable documents",
      "The departure time on the VTVF is a typographical error"
    ],
    correct: 1,
    explanation: "This is a billing for a service that could not have physically occurred. If the vessel departed at 03:00, a pilot cannot have boarded at 07:30 on the same vessel. This is a strong indicator of a fictitious or inflated pilotage charge — exactly the type of anomaly found in real pilotage billing audits."
  },
  {
    id: 7,
    category: "Vendor Management",
    scenario: `A vendor was awarded a ₦95,000,000 contract through competitive bidding. Post-award verification reveals the vendor's CAC registration address matches the personal home address of a procurement officer involved in the bid evaluation. The vendor was incorporated 2 weeks before the tender was issued.`,
    question: "What type of fraud scheme does this most likely indicate?",
    options: [
      "Bid rigging with a conflict of interest",
      "Front company / shell vendor scheme",
      "Both, conflict of interest and a potentially fictitious vendor",
      "Nothing unusual, new companies can win contracts"
    ],
    correct: 2,
    explanation: "Both red flags point to serious fraud risk: the shared address suggests the procurement officer has an undisclosed interest in the vendor (conflict of interest / self-dealing), while a vendor incorporated 2 weeks before the tender was issued suggests the company may have been created specifically to win this contract — a shell vendor scheme."
  },
  {
    id: 8,
    category: "Expense & Travel",
    scenario: `An employee submitted a travel expense claim for a 3-day field trip to Port Harcourt. The claim includes hotel receipts totalling ₦180,000. HR records show the employee was on approved sick leave for those exact three days. The expense was approved by the employee's line manager without query.`,
    question: "What should an auditor conclude?",
    options: [
      "The manager approved it, so it is valid",
      "The hotel receipts are likely forged, fraudulent expense claim",
      "The leave record and expense claim cannot both be accurate, further investigation required",
      "The employee may have recovered quickly, no issue"
    ],
    correct: 2,
    explanation: "An auditor does not jump to conclusions but identifies the irreconcilable conflict: an employee cannot be on approved sick leave and simultaneously travelling on company business. Both records cannot be accurate. This warrants investigation — potential fraud, record falsification, or a serious HR control failure. The manager's approval without query is a secondary finding."
  },
  {
    id: 9,
    category: "Financial Reporting",
    scenario: `End-of-quarter accounts show a ₦12,000,000 expense posted to 'Miscellaneous Repairs'. A review of the underlying transaction reveals it is the full cost of purchasing and installing a new generator set with a 10-year useful life. No fixed asset was created in the EAM system.`,
    question: "What is the accounting and audit risk here?",
    options: [
      "Revenue expenditure has been incorrectly expensed, no risk",
      "Capital expenditure has been misclassified as operating expense, understating assets and overstating costs",
      "The generator should have been split across multiple cost codes",
      "This is only a risk if the amount exceeds the capitalisation threshold"
    ],
    correct: 1,
    explanation: "A generator with a 10-year useful life is a capital asset — it must be capitalised on the balance sheet and depreciated, not fully expensed in one quarter. Misclassifying it as 'Miscellaneous Repairs' understates fixed assets, overstates operating costs, and reduces profit for the period. This is a material misstatement risk and may be deliberate to manage expense budgets."
  },
  {
    id: 10,
    category: "Access & IT Controls",
    scenario: `A system audit of the ERP shows that a finance officer who was transferred to a different department 6 months ago still has full payment approval rights in the system. Last month, three payments totalling ₦34,000,000 were approved using her credentials. She claims she was unaware her access was never revoked.`,
    question: "What control failures are present?",
    options: [
      "Only an IT oversight, access was not revoked on transfer",
      "Excessive access rights and potentially unauthorised payments",
      "Access control failure, potential unauthorised transactions, and inadequate user access review process",
      "No failure: the employee is still with the company"
    ],
    correct: 2,
    explanation: "Three control failures stack up: (1) access was not revoked upon role change, a basic joiner/mover/leaver process failure; (2) no periodic user access review was conducted to catch the orphaned rights; (3) ₦34,000,000 in payments approved by someone with no business need for that access represents potentially unauthorised transactions requiring investigation, regardless of intent."
  }
]