import React, { useState, useEffect, FC } from 'react';
import { Question, Option } from '../types/Question';
import JoditEditorWrapper from './JoditEditorWrapper';

interface QuestionEditorProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  editQuestion: Question | null;
  setEditQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
}

const QuestionEditor: FC<QuestionEditorProps> = ({ questions, setQuestions, editQuestion, setEditQuestion }) => {
  const [questionId, setQuestionId] = useState<number | string>(questions.length + 1);
  const [questionText, setQuestionText] = useState('');
  const [questionSubtitle, setQuestionSubtitle] = useState('');
  const [questionType, setQuestionType] = useState<'single-choice' | 'multi-choice'>('single-choice');
  const [options, setOptions] = useState<Option[]>([{ text: '', description: '', svg: '' }]);
  const [nextQuestions, setNextQuestions] = useState<{ [key: string]: number | string }>({});

  useEffect(() => {
    if (editQuestion) {
      setQuestionId(editQuestion.id);
      setQuestionText(editQuestion.question);
      setQuestionSubtitle(editQuestion.subtitle);
      setQuestionType(editQuestion.type);
      setOptions(editQuestion.options);
      setNextQuestions(editQuestion.next);
    }
  }, [editQuestion]);

  const addOption = () => setOptions([...options, { text: '', description: '', svg: '' }]);
  const handleOptionChange = (index: number, value: string, key: keyof Option) => {
    const newOptions = [...options];
    //@ts-ignore
    newOptions[index][key] = value;
    setOptions(newOptions);
  };

  const handleSaveQuestion = () => {
    const updatedQuestion: Question = {
      id: questionId || questions.length + 1,
      type: questionType,
      question: questionText,
      subtitle: questionSubtitle,
      options,
      next: nextQuestions
    };

    if (editQuestion) {
      const updatedQuestions = questions.map(q =>
        q.id === editQuestion.id ? updatedQuestion : q
      );
      setQuestions(updatedQuestions);
      setEditQuestion(null);
    } else {
      setQuestions([...questions, updatedQuestion]);
    }

    // Reset fields
    setQuestionId(questions.length + 1);
    setQuestionText('');
    setQuestionSubtitle('');
    setQuestionType('single-choice');
    setOptions([{ text: '', description: '', svg: '' }]);
    setNextQuestions({});
  };

  const handleNextQuestionChange = (option: string, value: string) => {
    setNextQuestions({
      ...nextQuestions,
      [option]: value
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {editQuestion ? 'Frage bearbeiten' : 'Neue Frage hinzufügen'}
      </h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Frage ID (optional)</label>
        <input
          type="text"
          value={questionId}
          onChange={e => setQuestionId(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Fragetext</label>
        <input
          type="text"
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Fragen-Subtitle</label>
        <JoditEditorWrapper
          value={questionSubtitle}
          onChange={newContent => setQuestionSubtitle(newContent)}
          className="p-2 border border-gray-300 rounded mr-2 w-full mb-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Fragentyp</label>
        <select
          value={questionType}
          onChange={e => setQuestionType(e.target.value as 'single-choice' | 'multi-choice')}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="single-choice">Single Choice</option>
          <option value="multi-choice">Multi Choice</option>
        </select>
      </div>
      <h3 className="text-xl font-semibold mb-2">Antwortmöglichkeiten</h3>
      {options.map((option, index) => (
        <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
          <div className="mb-2">
            <label className="block mb-1 font-semibold">{`Option ${index + 1} Text`}</label>
            <input
              type="text"
              value={option.text}
              onChange={e => handleOptionChange(index, e.target.value, 'text')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">{`Option ${index + 1} Beschreibung`}</label>
            <JoditEditorWrapper
              value={option.description}
              onChange={newContent => handleOptionChange(index, newContent, 'description')}
              className="p-2 border border-gray-300 rounded mr-2 w-full mb-2"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Optionstyp</label>
            <select
              value={option.type}
              onChange={e => handleOptionChange(index, e.target.value, 'type')}
              className="p-2 border border-gray-300 rounded w-full"
            >
               <option value="">Select your option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">OptionsText ausblenden</label>
            <select
              value={option.hideText}
              onChange={e => handleOptionChange(index, e.target.value, 'hideText')}
              className="p-2 border border-gray-300 rounded w-full"
            >
               <option value="">Select your option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Option SVG (als Text einfügen)</label>
            <input
              type="text"
              value={option.svg}
              onChange={e => handleOptionChange(index, e.target.value, 'svg')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Nächste Frage ID</label>
            <input
              type="text"
              value={nextQuestions[option.text] || ''}
              onChange={e => handleNextQuestionChange(option.text, e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>
      ))}
      <button onClick={addOption} className="bg-blue-500 text-white p-2 rounded mr-2">
        Option hinzufügen
      </button>
      <button onClick={handleSaveQuestion} className="bg-green-500 text-white p-2 rounded">
        {editQuestion ? 'Frage speichern' : 'Frage hinzufügen'}
      </button>
    </div>
  );
};

export default QuestionEditor;
