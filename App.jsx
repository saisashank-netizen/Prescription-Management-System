import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import StudentList from "./StudentList";

export default function App() {
  const [students, setStudents] = useState([
    "Ravi",
    "Priya",
    "Kiran",
  ]);
  const [name, setName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    document.title = `Students: ${students.length}`;
  }, [students]);

  const addStudent = () => {
    if (name.trim() === "") return;

    setStudents([...students, name]);
    setName("");
  };

  const deleteStudent = useCallback((index) => {
    setStudents((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }, []);

  const totalStudents = useMemo(() => {
    return students.length;
  }, [students]);

  const totalCharacters = useMemo(() => {
    return students.reduce(
      (sum, student) => sum + student.length,
      0
    );
  }, [students]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management Dashboard</h1>

      <input
        ref={inputRef}
        type="text"
        value={name}
        placeholder="Enter student name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>
        Add Student
      </button>

      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>

      <h3>Total Students: {totalStudents}</h3>
      <h3>Total Characters: {totalCharacters}</h3>

      <StudentList
        students={students}
        onDelete={deleteStudent}
      />
    </div>
  );
}