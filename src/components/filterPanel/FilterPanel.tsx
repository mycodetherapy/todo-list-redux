import "./FilterPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectFilter, setFilter } from "../../redux/tasksSlice";

export const FilterPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <section className="top-panel">
      <button
        onClick={() => dispatch(setFilter("all"))}
        className={`top-panel__button ${
          filter === "all" ? "top-panel__button_active" : ""
        }`}
      >
        Show All
      </button>
      <button
        onClick={() => dispatch(setFilter("completed"))}
        className={`top-panel__button ${
          filter === "completed" ? "top-panel__button_active" : ""
        }`}
      >
        Show Completed
      </button>
      <button
        onClick={() => dispatch(setFilter("incomplete"))}
        className={`top-panel__button ${
          filter === "incomplete" ? "top-panel__button_active" : ""
        }`}
      >
        Show Incomplete
      </button>
    </section>
  );
};

