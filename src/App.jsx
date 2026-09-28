import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "https://career-guidance-backend-cadc.onrender.com";

function App() {
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(1);
  const [savedStudent, setSavedStudent] = useState(null);
  const [careerGuidance, setCareerGuidance] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    educationLevel: "",
    board: "",
    stream: "",
    percentage: "",
    interest: "",
    preferredPath: "",
    careerGoal: "",
    skills: ""
  });

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const startJourney = () => {
    setStep(1);
    setPage("form");
  };

  const resetJourney = () => {
    setFormData({
      name: "",
      age: "",
      educationLevel: "",
      board: "",
      stream: "",
      percentage: "",
      interest: "",
      preferredPath: "",
      careerGoal: "",
      skills: ""
    });

    setSavedStudent(null);
    setCareerGuidance(null);
    setStep(1);
    setPage("form");
  };

  const nextStep = () => {
    setStep((previous) => previous + 1);
  };

  const previousStep = () => {
    setStep((previous) => previous - 1);
  };

  const saveStudent = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/students`,
        {
          ...formData,
          age: formData.age ? Number(formData.age) : null,
          percentage: formData.percentage
            ? Number(formData.percentage)
            : null
        }
      );

      const guidanceResponse = await axios.get(
        `${API_BASE_URL}/api/career-guidance`,
        {
          params: {
            educationLevel: formData.educationLevel,
            stream: formData.stream,
            interest: formData.interest,
            preferredPath: formData.preferredPath,
            careerGoal: formData.careerGoal
          }
        }
      );

      setSavedStudent(response.data);
      setCareerGuidance(guidanceResponse.data);
      setPage("success");

    } catch (error) {
      console.error("Backend Error:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }

      alert(
        "Backend connection failed. Please check the deployed API service and try again."
      );
    }
  };

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          🎓 CareerGuide
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("education")}>
            Explore
          </button>

          <button onClick={() => setPage("knowledge")}>
            Knowledge
          </button>
        </div>
      </nav>

      {page === "home" && (
        <section className="hero">

          <div className="hero-text">

            <span className="badge">
              🚀 Discover Your Future
            </span>

            <h1>
              Find Your <span>Career Path</span>
            </h1>

            <p>
              Tell us about yourself, your interests and your goals.
              We will organize the information into a clear career
              learning roadmap.
            </p>

            <button
              className="start-btn"
              onClick={startJourney}
            >
              Start My Journey →
            </button>

          </div>

          <div className="hero-card">

            <div className="big-icon">
              🎓
            </div>

            <h2>
              Your Future Starts Here
            </h2>

            <p>
              Explore • Learn • Plan • Grow
            </p>

            <div className="mini-cards">
              <div>📚 Courses</div>
              <div>💻 Skills</div>
              <div>🎯 Goals</div>
              <div>🗺️ Roadmap</div>
            </div>

          </div>

        </section>
      )}

      {page === "education" && (
        <section className="section">

          <h1>
            🎯 Explore Career Paths
          </h1>

          <p className="section-text">
            Start by telling us where you are in your education journey.
          </p>

          <div className="cards">

            <div
              className="career-card"
              onClick={startJourney}
            >
              <div className="card-icon">🧒</div>
              <h2>Before 10th</h2>
              <p>
                Explore interests and future possibilities.
              </p>
            </div>

            <div
              className="career-card"
              onClick={startJourney}
            >
              <div className="card-icon">📚</div>
              <h2>After 10th</h2>
              <p>
                Explore different courses and streams.
              </p>
            </div>

            <div
              className="career-card"
              onClick={startJourney}
            >
              <div className="card-icon">🎓</div>
              <h2>After 12th</h2>
              <p>
                Explore degrees and professional courses.
              </p>
            </div>

            <div
              className="career-card"
              onClick={startJourney}
            >
              <div className="card-icon">🚀</div>
              <h2>Degree / B.Tech</h2>
              <p>
                Explore jobs, higher studies and other paths.
              </p>
            </div>

          </div>

        </section>
      )}

      {page === "form" && (
        <section className="section">

          <div className="form-container">

            <div className="progress-area">

              <span>
                Step {step} of 5
              </span>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: (step * 20) + "%"
                  }}
                ></div>

              </div>

            </div>

            {step === 1 && (
              <div className="form-step">

                <div className="step-icon">
                  👋
                </div>

                <h1>
                  Let's Get to Know You
                </h1>

                <p>
                  First, tell us a little about yourself.
                </p>

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                />

                <label>
                  Your Age
                </label>

                <input
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    updateField("age", e.target.value)
                  }
                />

                <button
                  className="next-btn"
                  disabled={!formData.name}
                  onClick={nextStep}
                >
                  Next →
                </button>

              </div>
            )}

            {step === 2 && (
              <div className="form-step">

                <div className="step-icon">
                  🎓
                </div>

                <h1>
                  Where Are You Now?
                </h1>

                <p>
                  Select your current education level.
                </p>

                <div className="choice-grid">

                  {[
                    "Before 10th",
                    "After 10th",
                    "After 12th",
                    "Degree / B.Tech"
                  ].map((option) => (

                    <button
                      key={option}
                      className={
                        formData.educationLevel === option
                          ? "choice selected"
                          : "choice"
                      }
                      onClick={() =>
                        updateField(
                          "educationLevel",
                          option
                        )
                      }
                    >
                      {option}
                    </button>

                  ))}

                </div>

                <div className="form-buttons">

                  <button
                    className="back-btn"
                    onClick={previousStep}
                  >
                    ← Back
                  </button>

                  <button
                    className="next-btn"
                    disabled={!formData.educationLevel}
                    onClick={nextStep}
                  >
                    Next →
                  </button>

                </div>

              </div>
            )}

            {step === 3 && (
              <div className="form-step">

                <div className="step-icon">
                  📚
                </div>

                <h1>
                  Your Education
                </h1>

                <p>
                  Tell us about your current education.
                </p>

                {formData.educationLevel !== "Before 10th" && (
                  <>
                    <label>
                      Board
                    </label>

                    <select
                      value={formData.board}
                      onChange={(e) =>
                        updateField(
                          "board",
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select Board
                      </option>

                      <option value="CBSE">
                        CBSE
                      </option>

                      <option value="State Board">
                        State Board
                      </option>

                      <option value="ICSE">
                        ICSE
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </>
                )}

                <label>
                  Course / Stream
                </label>

                <select
                  value={formData.stream}
                  onChange={(e) =>
                    updateField(
                      "stream",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Course / Stream
                  </option>

                  <option value="MPC">
                    MPC
                  </option>

                  <option value="BiPC">
                    BiPC
                  </option>

                  <option value="CEC">
                    CEC
                  </option>

                  <option value="Polytechnic">
                    Polytechnic
                  </option>

                  <option value="B.Tech">
                    B.Tech
                  </option>

                  <option value="B.Sc">
                    B.Sc
                  </option>

                  <option value="Medical">
                    Medical
                  </option>

                  <option value="Pharmacy">
                    Pharmacy
                  </option>

                  <option value="Other Degree">
                    Other Degree
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                <label>
                  Percentage
                </label>

                <input
                  type="number"
                  placeholder="Enter percentage"
                  value={formData.percentage}
                  onChange={(e) =>
                    updateField(
                      "percentage",
                      e.target.value
                    )
                  }
                />

                <div className="form-buttons">

                  <button
                    className="back-btn"
                    onClick={previousStep}
                  >
                    ← Back
                  </button>

                  <button
                    className="next-btn"
                    onClick={nextStep}
                  >
                    Next →
                  </button>

                </div>

              </div>
            )}

            {step === 4 && (
              <div className="form-step">

                <div className="step-icon">
                  💡
                </div>

                <h1>
                  What Interests You?
                </h1>

                <p>
                  Select the area you are interested in.
                </p>

                <div className="choice-grid">

                  {[
                    "💻 Computers & Technology",
                    "🔬 Science",
                    "➗ Mathematics",
                    "🎨 Arts & Creativity",
                    "⚽ Sports",
                    "💼 Business",
                    "🛡️ Defence",
                    "❓ Not Sure"
                  ].map((option) => (

                    <button
                      key={option}
                      className={
                        formData.interest === option
                          ? "choice selected"
                          : "choice"
                      }
                      onClick={() =>
                        updateField(
                          "interest",
                          option
                        )
                      }
                    >
                      {option}
                    </button>

                  ))}

                </div>

                <div className="form-buttons">

                  <button
                    className="back-btn"
                    onClick={previousStep}
                  >
                    ← Back
                  </button>

                  <button
                    className="next-btn"
                    disabled={!formData.interest}
                    onClick={nextStep}
                  >
                    Next →
                  </button>

                </div>

              </div>
            )}

            {step === 5 && (
              <div className="form-step">

                <div className="step-icon">
                  🚀
                </div>

                <h1>
                  What's Your Future Direction?
                </h1>

                <p>
                  Select the path you want to explore.
                </p>

                <div className="choice-grid">

                  {[
                    "🎓 Higher Studies",
                    "💼 Job",
                    "🛡️ Army / Defence",
                    "💰 Business",
                    "🔬 Research",
                    "👨‍🎓 PhD"
                  ].map((option) => (

                    <button
                      key={option}
                      className={
                        formData.preferredPath === option
                          ? "choice selected"
                          : "choice"
                      }
                      onClick={() =>
                        updateField(
                          "preferredPath",
                          option
                        )
                      }
                    >
                      {option}
                    </button>

                  ))}

                </div>

                <label>
                  Career Goal
                </label>

                <input
                  type="text"
                  placeholder="Example: Software Developer"
                  value={formData.careerGoal}
                  onChange={(e) =>
                    updateField(
                      "careerGoal",
                      e.target.value
                    )
                  }
                />

                <label>
                  Current Skills
                </label>

                <textarea
                  placeholder="Example: Java, Python, SQL"
                  value={formData.skills}
                  onChange={(e) =>
                    updateField(
                      "skills",
                      e.target.value
                    )
                  }
                ></textarea>

                <div className="form-buttons">

                  <button
                    className="back-btn"
                    onClick={previousStep}
                  >
                    ← Back
                  </button>

                  <button
                    className="next-btn"
                    disabled={!formData.preferredPath}
                    onClick={saveStudent}
                  >
                    Get My Career Roadmap 🚀
                  </button>

                </div>

              </div>
            )}

          </div>

        </section>
      )}

      {page === "success" && (
        <section className="section">

          <div className="success-container">

            <div className="success-icon">
              ✅
            </div>

            <h1>
              Your Career Roadmap is Ready!
            </h1>

            {savedStudent && (
              <p>
                Welcome, <strong>{savedStudent.name}</strong>!
              </p>
            )}

            {careerGuidance && (
              <div className="guidance">

                <h2>
                  {careerGuidance.career}
                </h2>

                <p>
                  {careerGuidance.description}
                </p>

                <h3>
                  📚 Study Topics
                </h3>

                <ul>
                  {careerGuidance.studyTopics?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>

                <h3>
                  💻 Skills
                </h3>

                <ul>
                  {careerGuidance.skills?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>

                <h3>
                  🎯 Preparation
                </h3>

                <ul>
                  {careerGuidance.preparation?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>

                <h3>
                  🗺️ Roadmap
                </h3>

                <ol>
                  {careerGuidance.roadmap?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ol>

                <h3>
                  🔗 Resources
                </h3>

                <ul>
                  {careerGuidance.resources?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>

              </div>
            )}

            <button
              className="start-btn"
              onClick={resetJourney}
            >
              Start Again
            </button>

          </div>

        </section>
      )}

      {page === "knowledge" && (
        <section className="section">

          <h1>
            📖 Career Knowledge
          </h1>

          <p className="section-text">
            Build your knowledge before choosing your career path.
          </p>

          <div className="cards">

            <div className="career-card">

              <div className="card-icon">
                💻
              </div>

              <h2>
                Technology
              </h2>

              <p>
                Programming, software development, databases,
                cloud and cybersecurity.
              </p>

            </div>

            <div className="career-card">

              <div className="card-icon">
                🔬
              </div>

              <h2>
                Science
              </h2>

              <p>
                Science, mathematics, research and analytical careers.
              </p>

            </div>

            <div className="career-card">

              <div className="card-icon">
                💼
              </div>

              <h2>
                Business
              </h2>

              <p>
                Entrepreneurship, management, marketing and finance.
              </p>

            </div>

            <div className="career-card">

              <div className="card-icon">
                🛡️
              </div>

              <h2>
                Defence
              </h2>

              <p>
                Explore eligible defence services and preparation paths.
              </p>

            </div>

          </div>

        </section>
      )}

      <footer>
        <p>
          © 2026 CareerGuide | Explore • Learn • Plan • Grow
        </p>
      </footer>

    </div>
  );
}

export default App;