const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// initiate the app // api config
const app = express();

// connect database
connectDB();

// middleware
app.use(express.json({ extended: false }));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Admin Routes
// @@@@@@@@@Creating a new teacher @ admin level
app.use("/api/admin/teacher", require("./routes/api/admin/teacher"));
app.use("/api/admin/authTeacher", require("./routes/api/admin/authTeacher"));
// @@@@@@@Students
app.use(
  "/api/admin/students/student",
  require("./routes/api/admin/students/student")
);
app.use(
  "/api/admin/students/authStudent",
  require("./routes/api/admin/students/authStudent")
);

// @@@@@@@classes
app.use(
  "/api/admin/classes/class",
  require("./routes/api/admin/classes/class")
);
// @@@@@@@Creating new subject object
app.use(
  "/api/admin/subjects/subject",
  require("./routes/api/admin/subjects/subject")
);

// Teacher routes @@to create and update homework
app.use("/api/teacher/homework", require("./routes/api/teacher/homework"));
app.use("/api/teacher/complete", require("./routes/api/teacher/complete"));
// Teacher route @@to create classes
app.use("/api/teacher/classroom", require("./routes/api/teacher/classroom"));
// get all the subject from the Admin by teacher's name
app.use("/api/teacher/teacher", require("./routes/api/teacher/teacher"));
// Student Route @@retrive the homework from the teacher
app.use("/api/student/homework", require("./routes/api/student/homework"));
app.use("/api/student/complete", require("./routes/api/student/complete"));
app.use(
  "/api/student/parents/parent",
  require("./routes/api/student/parents/parent")
);
// @@Login teachers using token
app.use(
  "/api/student/parents/authParent",
  require("./routes/api/student/parents/authParent")
);

// Parent Route
app.use("/api/parent/complete", require("./routes/api/parent/complete"));
app.use("/api/parent/pending", require("./routes/api/parent/pending"));
// @@@Get student feedback
app.use("/api/parent/feedback", require("./routes/api/parent/feedback"));
// feedback routes
app.use(
  "/api/feedback/teacherMsg",
  require("./routes/api/feedback/teacherMsg")
);
app.use(
  "/api/feedback/studentMsg",
  require("./routes/api/feedback/studentMsg")
);

app.use("/uploads", express.static("uploads"));
//  Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.use("/uploads", express.static("uploads"));
}

// listerner
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
