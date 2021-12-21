import { useState, useCallback, useEffect, useMemo } from "react";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import Header from "../Header";
import Table from "../Table";

import {
  fetchQuestions,
  fetchCategoryQuestions,
  fetchQuestionsByCategory,
} from "../../api/questions";

import "./App.css";
import Spinner from "../Spinner";

const getParsedData = (data) => {
  return data.map((question, index) => ({
    ...question,
    id: index + 1,
    createdBy: "Pablo",
  }));
};

const AMOUNTS = [10, 20, 30, 40, 50];

function App() {
  const [amount, setAmount] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchQuestions(50)
      .then((payload) => {
        const { response_code, results } = payload;
        if (response_code === 0) {
          const parsedData = getParsedData(results);
          setData(parsedData);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
    fetchCategoryQuestions()
      .then(({ trivia_categories }) => {
        setCategoriesOptions(trivia_categories);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleCategoryChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setLoading(true);
    fetchQuestionsByCategory(50, value)
      .then((payload) => {
        const { response_code, results } = payload;
        if (response_code === 0) {
          const parsedData = getParsedData(results);
          setData(parsedData);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  }, []);

  const toggleFilter = useCallback(() => {
    setLoading(true);
    setFilters((filtersPrevState) => {
      if (!filtersPrevState || filtersPrevState === "desc") {
        setData((prevState) => prevState.sort((a, b) => b.id - a.id));
        return "asc";
      } else {
        setData((prevState) => prevState.sort((a, b) => a.id - b.id));
        return "desc";
      }
    });
    // Re-render table component with sorted data and page 1
    // TODO - Fix error in table component
    // - When toggling sort, table component maintains the same structured data (useEffect is not triggered again with new data)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleAmountChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setAmount(value);
  }, []);

  const memoizedColumns = useMemo(
    () => [
      {
        name: "id",
        label: "ID",
        render: () => (
          <button className="w-60 filter-button" onClick={toggleFilter}>
            ID
            {filters && filters === "desc" ? <AiOutlineArrowDown /> : null}
            {filters && filters === "asc" ? <AiOutlineArrowUp /> : null}
          </button>
        ),
      },
      { name: "category", label: "Category" },
      { name: "type", label: "Type" },
      { name: "difficulty", label: "Difficulty" },
      { name: "question", label: "Question / Statement" },
      {
        name: "createdBy",
        render: () => <div className="w-90">Created By</div>,
      },
    ],
    [filters, toggleFilter]
  );

  const memoizedRows = useMemo(
    () => [
      { name: "id" },
      { name: "category" },
      { name: "type" },
      { name: "difficulty" },
      { name: "question" },
      { name: "createdBy" },
    ],
    []
  );

  return (
    <div className="app">
      <Header />
      <main>
        <div className="table-container">
          <h1>Browse Questions</h1>
          {loading ? (
            <div className="loader-container">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="table-filters">
                <select
                  onChange={handleCategoryChange}
                  className="table-filters-select"
                >
                  {categoriesOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  onChange={handleAmountChange}
                  className="table-filters-select"
                >
                  {AMOUNTS.map((amount, index) => (
                    <option key={index + 1} value={amount}>
                      {amount}
                    </option>
                  ))}
                </select>
              </div>

              <Table
                columns={memoizedColumns}
                rows={memoizedRows}
                data={data}
                amount={amount}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
