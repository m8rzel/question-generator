import QuestionEditor from "@/components/QuestionEditor";
import { Question } from "@/types/Question";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

export default function index() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);

  const handleEdit = (question: Question) => {
    setEditQuestion(question);
  };
  useEffect(() => {
    console.log("Ques", questions);
  }, [questions]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Fragen Generator</h1>
      <QuestionEditor
        questions={questions}
        setQuestions={setQuestions}
        editQuestion={editQuestion}
        setEditQuestion={setEditQuestion}
      />
      <h2 className="text-2xl font-bold mt-6">Fragen bearbeiten</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id} className="mb-2">
            <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="font-bold">{question.question}</h3>
                <p>{question.subtitle}</p>
              </div>
              <button
                onClick={() => handleEdit(question)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Bearbeiten
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-6">Generierte JSON</h2>
      <MonacoEditor
        onChange={(code) => setQuestions(JSON.parse(code ?? '[]') as Question[])}
        height="90vh"
        defaultLanguage="json"
        theme="vs-light"
        value={JSON.stringify(questions ?? [], null, 2)}
      />
      {/* <pre className="bg-gray-100 p-4 rounded">{JSON.stringify({ questions }, null, 2)}</pre> */}
    </div>
  );
}
