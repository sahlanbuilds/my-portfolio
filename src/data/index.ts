export const personalInfo = {
  name: "Muhammad Sahlan",
  role: "Intern Software Engineer",
  location: "Ibbagamuwa, Kurunegala, Sri Lanka",
  email: "muhammad.sahlan.tech@gmail.com",
  phone: "070 517 8558",
  profile: "IT undergraduate specializing in software development with hands-on experience in React, TypeScript, PHP, Java, MySQL, and Firebase Firestore, with a broader working knowledge of full-stack web development. Strong foundation in object-oriented programming, database management, cloud-based data storage, and user interface development, with experience building practical web-based applications. Interested in creating well-structured, user-friendly software and seeking an internship opportunity to apply and develop technical skills through real-world projects.",
  careerDirection: "Software Engineering with a long-term interest in Cloud Engineering and DevOps.",
  languages: ["English", "Tamil", "Sinhala"],
  skills: [
    "React",
    "Node.js",
    "PHP",
    "Java",
    "MySQL",
    "Firebase",
    "SQLite",
    "Object-Oriented Programming",
    "Database Management",
    "Full-Stack Web Development",
  ]
};

export const skillCategories = [
  {
    title: "PROGRAMMING",
    skills: ["Java", "JavaScript", "PHP"]
  },
  {
    title: "WEB",
    skills: ["React", "HTML", "CSS", "Tailwind CSS", "Node.js"]
  },
  {
    title: "DATABASE",
    skills: ["MySQL", "Firebase", "SQLite"]
  },
  {
    title: "TOOLS",
    skills: ["Git", "GitHub", "VS Code"]
  },
  {
    title: "CORE",
    skills: ["Object-Oriented Programming", "Database Management", "UI/UX", "Software Development"]
  }
];

export const projects = [
  {
    id: "01",
    title: "MensCollection Colombo Blazer Rental",
    description: "Developed a web-based blazer rental platform for MensCollection Colombo, allowing users to browse and book wedding blazers and groom packages.",
    overview: "A comprehensive blazer rental platform designed to streamline the booking process for MensCollection Colombo.",
    keyFeatures: [
      "Blazer collection browsing",
      "Rental module integration",
      "Groom package selection",
      "Booking submission and management"
    ],
    contribution: "Designed and developed the application, integrating Firebase for data management and booking submissions.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    image: "/mens-collection.png",
    links: {
      github: "https://github.com/sahlanbuilds/Mens_Collection",
      live: "https://mens-collection-gamma.vercel.app"
    }
  },
  {
    id: "02",
    title: "AQUAVISTA Boat Reservation System",
    description: "Developed a comprehensive web-based boat tour reservation system, allowing users to discover and book private yacht voyages with customizable services.",
    overview: "A premium boat tour reservation platform designed for seamless booking of private marine experiences.",
    keyFeatures: [
      "Customized marine tour booking",
      "Private yacht voyage scheduling",
      "Dynamic custom service planning",
      "Admin dashboard and management"
    ],
    contribution: "Designed and developed the full stack application using PHP and MySQL to manage tours, bookings, and user interactions.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "/aquavista.png",
    links: {
      github: "https://github.com/sahlanbuilds/AQUAVISTA-Boat-Reservation-System",
      live: "http://aquavista.gamer.gd"
    }
  },
  {
    id: "03",
    title: "University Attendance System",
    description: "Developed a comprehensive university attendance system to manage student and lecturer records, track attendance, and generate reports.",
    overview: "A streamlined web-based system for universities to effectively manage attendance and academic records.",
    keyFeatures: [
      "Lecturer and student dashboards",
      "Attendance tracking and logging",
      "Course and user management",
      "Real-time reporting"
    ],
    contribution: "Developed the full stack application using PHP, MySQL, HTML, and CSS.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    image: "/attendance-system.png",
    links: {
      github: "https://github.com/sahlanbuilds/University_attendence_system",
      live: "http://atiattendance.site.je"
    }
  }
];

export const education = [
  {
    degree: "Higher National Diploma in Information Technology",
    institution: "Sri Lanka Institute of Advanced Technological Education (SLIATE), Kurunegala",
    period: "2024 – Present"
  },
  {
    degree: "Certificate in Spoken English",
    institution: "Open University of Puttalam",
    period: "2023"
  }
];
