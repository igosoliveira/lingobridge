import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { GenerateDefaultText } from "./application/usecases/main/GenerateDefaultText";
import MongoDB from "./infrastructure/repositories/mongodb/mongodb";

MongoDB.connect();

const config = {
  executions: 0,
  maxExecutions: 200,
};
const progress = {
  errors: 0,
  success: 0,
};

const subjects: string[] = [
  "Technology",
  "Science",
  "Politics",
  "Culture",
  "Health",
  "Environment",
  "Education",
  "Art",
  "Economy",
  "History",
  "Philosophy",
  "Religion",
  "Sports",
  "Travel",
  "Food and Cuisine",
  "Fashion",
  "Entertainment",
  "Automobiles",
  "Music",
  "Literature",
  "Psychology",
  "Trends",
  "Family and Relationships",
  "Business",
  "Information Technology",
  "Personal Development",
  "Wellness",
  "Diversity and Inclusion",
  "Time Management",
  "Outdoor Adventures",
  "Science Fiction",
  "Gardening",
  "Photography",
  "Digital Marketing",
  "Finance",
  "Fashion Design",
  "DIY (Do It Yourself)",
  "Mindfulness",
  "Fitness and Exercise",
  "Artificial Intelligence",
  "Cybersecurity",
  "Space Exploration",
  "Home Decor",
  "Cooking Techniques",
  "Geopolitics",
  "Online Gaming",
  "Cryptocurrency",
  "Startup Culture",
  "Social Media",
  "Environmental Sustainability",
  "Culinary Adventures",
  "Movie Reviews",
  "Human Rights",
  "Wildlife Conservation",
  "Travel Destinations",
  "Adventure Sports",
  "Virtual Reality",
  "Machine Learning",
  "Blockchain Technology",
  "Space Science",
  "Astronomy",
  "Environmental Conservation",
  "Human Psychology",
  "Self-Help",
  "Renewable Energy",
  "History of Art",
  "Fashion Trends",
  "Social Issues",
  "Biology",
  "Healthy Cooking",
  "Cultural Anthropology",
  "International Relations",
  "Graphic Design",
  "Digital Art",
  "Automotive Technology",
  "Travel Photography",
  "Entrepreneurship",
  "Mobile Apps",
  "Futurology",
  "Public Speaking",
  "Natural Sciences",
  "Hiking and Trekking",
  "Political Philosophy",
  "Music Production",
  "Comedy and Stand-Up",
  "Sociology",
  "Productivity Hacks",
  "Renovation and DIY Projects",
  "Sports Nutrition",
  "Science Communication",
  "Astrobiology",
  "Art History",
  "Interior Design",
  "Online Education",
  "Aviation",
  "World Religions",
  "Cinema Studies",
  "Philanthropy",
  "Data Science",
  "Mobile Gaming",
  "Human Anatomy",
  "Theater and Performing Arts",
  "Ancient History",
  "Folklore and Mythology",
  "Animal Behavior",
  "Sustainable Fashion",
  "Humanitarian Aid",
  "Nutrition and Dietetics",
  "Creative Writing",
  "Machine Vision",
  "Educational Technology",
  "Marine Biology",
  "Astrophysics",
  "User Experience Design",
  "Archaeology",
  "Sustainable Agriculture",
  "Political Science",
  "Space Travel",
  "Documentary Filmmaking",
  "Language Learning",
  "Urban Planning",
  "Virtual Assistants",
  "Environmental Ethics",
  "Cognitive Psychology",
  "Human-Computer Interaction",
  "Quantum Physics",
  "Neuroscience",
  "Human Geography",
  "Green Energy Solutions",
  "Aerospace Engineering",
  "Renewable Resources",
  "Human-Centered Design",
  "Public Health",
  "Game Development",
  "Culinary Arts",
  "Social Entrepreneurship",
  "Digital Journalism",
  "Child Psychology",
  "Disaster Management",
  "Sustainable Tourism",
  "Eco-Friendly Living",
  "Film Production",
  "Fashion Marketing",
  "Space Colonization",
  "Global Economy",
  "Political Activism",
  "Human Rights Law",
  "Mental Health Awareness",
  "Ancient Civilizations",
  "Wildlife Photography",
  "Neuro-Linguistic Programming",
  "Biomedical Engineering",
  "Behavioral Economics",
  "Science Fiction Literature",
  "Philosophy of Mind",
  "Environmental Conservation",
  "Cognitive Science",
  "Public Relations",
  "AI Ethics",
  "Crisis Management",
  "Public Policy",
  "Bioinformatics",
  "Human-Computer Ethics",
  "Sustainable Architecture",
  "Alternative Medicine",
  "Environmental Activism",
  "Sociolinguistics",
  "Human Genetics",
  "Criminal Justice",
  "Political Campaign Strategy",
  "Social Psychology",
  "Nanotechnology",
  "Historical Fiction",
  "Epidemiology",
  "Futuristic Technology",
  "Environmental Law",
  "Biomimicry",
  "Theater Production",
  "Green Building Design",
  "Renewable Energy Policy",
  "Holistic Health",
  "Human Resources Management",
  "Space Agencies",
  "Bioethics",
  "Scientific Research",
  "Youth Empowerment",
  "Human Rights Advocacy",
  "Gender Studies",
  "Environmental Education",
  "Public Safety",
  "Data Privacy",
  "Virtual Reality Gaming",
  "Conscious Living",
  "Green Transportation",
  "International Trade",
  "Sustainable Development",
  "Public Policy Analysis",
  "Quantum Computing",
];

console.log(subjects.length);
subjects.reverse()

let indexSubjects = 0;
const intervalo = setInterval(async () => {
  const textCreated = await GenerateDefaultText.execute(
    "en-US",
    subjects[indexSubjects++]
  );

  if (indexSubjects > subjects.length - 1) {
    indexSubjects = 0;
  }
  if (textCreated) {
    progress.success++;
  } else {
    progress.errors++;
  }
  config.executions++;
  console.log(`execultando: ${config.executions}`);
  console.log(progress);
  console.log("create text process completed.");
  if (config.executions === config.maxExecutions) {
    console.log(progress);
    clearInterval(intervalo);
    return;
  }
}, 60000);
