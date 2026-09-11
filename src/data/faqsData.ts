export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I find my correct NOC code?",
    answer: "Look at what you actually do at work every day. Compare your daily tasks with the 'Main Duties' listed under the NOC code. If you perform more than half of those duties, you have found the right code—even if your official company job title is slightly different."
  },
  {
    id: "faq-2",
    question: "Which TEER levels qualify for Express Entry?",
    answer: "TEER 0, 1, 2, and 3 are eligible for Express Entry (both Federal Skilled Worker and Canadian Experience Class). TEER 4 and 5 are not eligible for Express Entry directly, but you can still apply through Provincial Nominee Programs (PNP) or special pilot streams."
  },
  {
    id: "faq-3",
    question: "What are Express Entry category draws?",
    answer: "Instead of only inviting people with the highest CRS points, Canada now holds special draws for in-demand fields like Tech, Healthcare, Trades, Transport, Agriculture, and French speakers. If your job is on this priority list, you can get an invitation with a much lower CRS score."
  },
  {
    id: "faq-4",
    question: "Why is the median wage important for an LMIA work permit?",
    answer: "If a Canadian company wants to hire you from overseas, they need an LMIA approval. By law, they have to pay you at least the median hourly wage for your job in that province. If they offer less, the application becomes much harder to approve."
  },
  {
    id: "faq-5",
    question: "What is the difference between old 4-digit NOC and new 5-digit NOC?",
    answer: "In late 2022, Canada switched from 4-digit codes to 5-digit codes. The second digit tells you your TEER level right away. For example, in NOC 21232, the second number is 1, which means it is TEER 1."
  },
  {
    id: "faq-6",
    question: "What if my exact company job title is not on this website?",
    answer: "That is completely normal. Companies make up new titles all the time. As long as your daily duties match what is written in the official NOC code, your application is valid and accepted by visa officers."
  }
];
