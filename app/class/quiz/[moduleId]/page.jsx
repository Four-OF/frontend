import QuizComponent from "../quiz-component"

export default async function QuizPage({ params }) {
  // Await params as required by Next.js app router
  const awaitedParams = await params;
  const moduleTitle =
    {
      "html-css-basics": "HTML & CSS Fundamentals",
      "javascript-essentials": "JavaScript Essentials",
      "responsive-design": "Responsive Web Design",
      "nextjs-foundations": "Next.js Foundations",
    }[awaitedParams.moduleId] || "Module Quiz"

  return (
    <div className="container py-8">
      <QuizComponent moduleId={awaitedParams.moduleId} moduleTitle={moduleTitle} />
    </div>
  )
}
