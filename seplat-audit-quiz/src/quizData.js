export const quizData = [
  {
    "id": 1,
    "category": "Purchases & Orders",
    "scenario": "A company placed an order for drilling chemicals on March 15. But the warehouse already recorded receiving those chemicals on March 10. The invoice arrived on March 20 and was approved the same day by the same person who placed the original order.",
    "question": "How many problems can you spot?",
    "options": [
      "The same person approved their own invoice",
      "Goods arrived before the order existed, and the same person approved their own invoice",
      "Early delivery, self-approval, and the invoice was approved too fast",
      "None, this looks like normal business practice"
    ],
    "correct": 1,
    "explanation": "You cannot receive goods before an order exists, that's like getting a delivery before you placed the order online. Something was either backdated or falsified. Separately, the person who placed the order also approved the payment, that's like a cashier scanning their own groceries and signing off the receipt themselves. Two distinct failures, not one."
  },
  {
    "id": 2,
    "category": "Vessel Safety",
    "scenario": "A Vessel's (Ship) official safety certificate requires a minimum of 12 crew on board at all times. When the vessel departed, only 9 were on board and the captain signed the departure checklist as 'all in order.'",
    "question": "What is the most critical problem?",
    "options": [
      "The captain falsely certified that everything was fine",
      "The ship sailed with fewer crew than required",
      "The ship's operating licence had expired",
      "All are equally serious problems"
    ],
    "correct": 3,
    "explanation": "Sailing short-handed endangers every life on board. The captain lying on an official safety document is fraud. Operating without a valid licence means the vessel had no legal authority to be at sea. None of these outranks the others — a thorough investigator flags all three."
  },
  {
    "id": 3,
    "category": "Invoice Fraud",
    "scenario": "A catering vendor submitted a bill for ₦10 million on October 30 2025. Finance paid it promptly. On November 25 2025, the same vendor submitted another bill for ₦10 million for 'monthly catering services.' The new bill has a different invoice number and a different submission date. The finance officer who processed the first payment is on leave, and a different officer approves the second one without flagging anything.",
    "question": "The second payment was approved without any issues raised. What should have stopped it?",
    "options": [
      "The second officer should have refused since the first officer was the one who opened the vendor account",
      "A check against previous payments to the same vendor would have shown an identical claim was paid just 30 days earlier",
      "The vendor should have been asked to resubmit with a purchase order attached",
      "Nothing, monthly invoices from the same vendor for the same amount are completely normal"
    ],
    "correct": 1,
    "explanation": "The different invoice number and new submission date are designed to make this look like a fresh, legitimate claim. But a simple check of payment history would have revealed an identical amount was paid to the same vendor for the same service just 30 days prior. The change of approving officer created a gap in institutional memory that the duplicate exploited."
  },
  {
    "id": 4,
    "category": "Contract Compliance",
    "scenario": "A waste disposal contract was signed in January 2026, covering only onshore facilities at three named locations. In August, an invoice arrives from the same vendor for ₦5 million. The service description reads 'waste disposal — Platforms A, B and C.' The amount is within the contract ceiling. The invoice was approved and paid within 48 hours.",
    "question": "Everything looks routine on the surface. What is the anomaly?",
    "options": [
      "The invoice was approved too quickly, 48 hours is below the standard processing window",
      "Platforms A, B and C are offshore locations, but the contract only covers onshore facilities",
      "The vendor should have submitted separate invoices for each platform",
      "There is no anomaly, the amount is within the contract ceiling so the payment is valid"
    ],
    "correct": 1,
    "explanation": "The contract explicitly covers onshore facilities only. Platforms are offshore structures. The vendor billed for work that falls entirely outside the scope of what was agreed — but because the amount passed the automated limit check, nobody caught it. Approving a payment quickly is not the problem; approving it without checking whether the work was actually in scope is."
  },
  {
    "id": 5,
    "category": "Missing Assets",
    "scenario": "A Long Lead Item (Wellhead) worth $500,000 was officially logged as received into the warehouse on April 2, 2026. A physical check on April 30, 2026 found no trace of it. The store officer who signed the receipt form resigned on April 10, 2026. No one filed a missing-item report.",
    "question": "Which combination of risks is present?",
    "options": [
      "A storage mix-up and poor record-keeping",
      "The receipt may have been faked, the item may have been stolen, and the missing report was never raised",
      "A routine cataloguing error, items get misplaced all the time",
      "The supplier simply never delivered it"
    ],
    "correct": 1,
    "explanation": "A $280,000 item recorded as received but nowhere to be found suggests either the paperwork was fabricated or the item was taken after arrival. The officer who signed for it leaving shortly afterwards is suspicious timing. And nobody raising an alarm when a quarter-million-dollar asset goes missing is itself a serious breakdown. All three threads need to be pulled."
  },
  {
    "id": 6,
    "category": "Billing for Work Not Done",
    "scenario": "A pilotage company was billed for guiding a vessel out of port on the morning of June 14, 2026. Port traffic records show the vessel departed at 3:00 AM. The invoice states the pilot boarded at 7:30 AM.",
    "question": "What is the primary audit finding?",
    "options": [
      "The invoice date does not match the port records",
      "The pilot could not have boarded a ship that had already sailed, this service was never provided",
      "Port traffic records are often unreliable and should not be used as evidence",
      "The departure time on the port record is likely a typing error"
    ],
    "correct": 1,
    "explanation": "You cannot board a vessel that has already left port. The timeline makes the service physically impossible. This is a bill for work that did not happen — one of the clearest forms of fraudulent invoicing. It is equivalent to a taxi driver billing you for a journey that began after you had already arrived at your destination."
  },
  {
    "id": 7,
    "category": "Conflicts of Interest",
    "scenario": "A ₦100 million contract was awarded to Company A Services Ltd following a competitive tender. Three other companies also submitted bids. Company A's bid came in second lowest. Post-award checks show the following: Company A was incorporated on March 3, 2026. The tender was advertised on March 17, 2026. Company A's registered office address is 14 Admiralty way, Lekki, the same address listed as the personal residence of Mr. Emeka Eze, one of the three members of the bid evaluation committee.",
    "question": "Looking at the post-award information, what stands out as the most serious anomaly?",
    "options": [
      "Company A did not submit the lowest bid and should not have won the contract",
      "The company was registered two weeks before the tender was published, and shares an address with one of the evaluators who scored the bids",
      "The tender attracted too few bidders for the process to be considered truly competitive",
      "Post-award checks should have been completed before the contract was signed, not after"
    ],
    "correct": 1,
    "explanation": "A company that did not exist until two weeks before a tender was published raises serious questions about whether it was created specifically for this contract. The shared address with a bid evaluator suggests that evaluator may have had an undisclosed financial interest in the winning vendor, a direct conflict of interest. Together, these findings call the entire process into question, regardless of which bid came in lowest."
  },
  {
    "id": 8,
    "category": "Expense Claims",
    "scenario": "An employee submitted a travel expense claim for a three-day business trip to Port Harcourt, including hotel receipts totalling ₦200,000. The claim was approved by the line manager and scheduled for payment. During a routine audit, the reviewer pulls the employee's HR record and notices the employee was on approved sick leave for those exact three days.",
    "question": "What is the most important action the auditor should take immediately?",
    "options": [
      "Reject the claim and issue a formal warning to the line manager for approving it",
      "Flag the conflict between the two records and escalate for investigation before any payment is made",
      "Ask the employee to provide a doctor's note confirming the dates of their illness",
      "Approve the payment since the manager has already signed it off"
    ],
    "correct": 1,
    "explanation": "The auditor's immediate priority is to stop the payment and escalate, not to reach a verdict. Both records cannot be accurate: an employee cannot be on approved sick leave and travelling on company business at the same time. Whether this is fraud, an HR error, or something else is for the investigation to determine. Acting before payment is made is critical; recovering money after the fact is far harder."
  },
  {
    "id": 9,
    "category": "Financial Records",
    "scenario": "A company buys a brand-new generator for ₦10 million. The generator is installed at the main office and is expected to be used for the next 10 years. When the finance team records the purchase, they log it under 'Miscellaneous Repairs' in that month's expenses. No separate record of the generator is created anywhere.",
    "question": "What is wrong with how this purchase was recorded?",
    "options": [
      "The generator should have been recorded under 'Equipment' not 'Repairs', but the financial impact is the same either way",
      "A ₦10 million item the company will use for 10 years should be recorded as something the company owns, not as a one-month expense",
      "The purchase needed a separate approval before it could be recorded at all",
      "Nothing is wrong, all purchases should be expensed in the month they are made"
    ],
    "correct": 1,
    "explanation": "When a company buys something it will use for years, a generator, a vehicle, a building — it should be recorded as something the company owns, not as a cost that disappears in the month it was bought. Recording it as a repair makes that month's expenses look much higher than they really are, and the generator never shows up as a company asset. This could be an honest mistake — or a deliberate way to make costs appear inflated."
  },
  {
    "id": 10,
    "category": "System Access",
    "scenario": "The company's payment system shows the following activity for the month of October: three payments totalling ₦30 million were approved by user ID FO-0047. HR records show that the employee assigned to FO-0047, Mrs. Ngozi Adeyemi, was officially transferred to the Communications department in April. Her current role involves media monitoring and press releases.",
    "question": "What is the anomaly in this picture?",
    "options": [
      "Three payments in a single month is an unusually high volume for one approver",
      "A staff member with no finance role is approving multi-million naira payments six months after leaving the finance department",
      "The payments should have been split across multiple approvers to reduce concentration risk",
      "Mrs. Adeyemi's user ID should have been updated to reflect her new department name"
    ],
    "correct": 1,
    "explanation": "The anomaly is not the amount or the volume, it is who approved the payments. Mrs. Adeyemi has been in a non-finance role for six months, yet her system credentials still carry full payment approval rights. ₦34 million approved by someone with no legitimate business reason to hold that access demands immediate investigation. The root cause — access not being removed when she changed roles — is a process failure, but the payments themselves now need to be examined."
  }
]