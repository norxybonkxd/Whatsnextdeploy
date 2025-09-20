import React from 'react';

const features = [
  {
    title: 'Personalized Career Mapping',
    description: 'Tailored career paths designed to match individual education, interests, and goals for clear progression.',
  },
  {
    title: 'AI-Based Skill Gap Analysis',
    description: 'Intelligent assessment of current skills versus industry requirements to recommend targeted learning.',
  },
  {
    title: 'Real-Time Labor Market Insights',
    description: 'Up-to-date data on job trends, demand, and opportunities to guide decision making.',
  },
  {
    title: 'Multi-Interest/Multi-Path Career Support',
    description: 'Flexibility to explore and balance multiple career interests and pathways seamlessly.',
  },
  {
    title: 'Plan B/C (Career Resilience and Recovery Planning)',
    description: 'Strategic alternatives and backup plans to maintain career growth despite unforeseen changes.',
  },
  {
    title: 'Dynamic Interactive Flowchart Roadmaps',
    description: 'Visual, interactive flowcharts that update dynamically to reflect career progress and options.',
  },
];

const fadeInAnimation = `animate-fadeIn`;

const CareerGuidanceWithVideo: React.FC = () => {
  const videoSrc = '/videos/career-guidance-demo.mp4'; // Replace with your actual video URL

  return (
    <section className="max-w-5xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-700">
      <h1
        className={`text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-10 ${fadeInAnimation}`}
        style={{ animationDuration: '1.5s' }}
      >
        How Our AI-Powered Career Guidance Helps Students
      </h1>

      <p
        className={`text-center text-lg text-gray-300 mb-16 max-w-3xl mx-auto ${fadeInAnimation}`}
        style={{ animationDuration: '1.8s' }}
      >
        Empower your career journey with personalized, data-driven tools that adapt to your goals, skills, and interests.
        Navigate your future with confidence and resilience.
      </p>

      <div className={`space-y-10 ${fadeInAnimation}`} style={{ animationDuration: '2s' }}>
        {features.map(({ title, description }, index) => (
          <div
            key={title}
            className="p-6 bg-gray-800 border border-purple-700 rounded-lg shadow-lg hover:shadow-pink-600 transition-shadow duration-500"
            style={{ animationDelay: `${0.3 * (index + 1)}s`, animationFillMode: 'forwards' }}
          >
            <h2 className="text-2xl font-semibold text-pink-400 mb-3">{title}</h2>
            <p className="text-gray-300 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <div
        className={`mt-16 flex flex-col items-center space-y-6 ${fadeInAnimation}`}
        style={{ animationDuration: '2.5s' }}
      >
        <label className="text-pink-400 text-lg font-semibold">
          Career Guidance Demo Video
        </label>
        <video
          controls
          src={videoSrc}
          className="rounded-lg shadow-xl max-w-lg w-full border border-pink-600"
          preload="metadata"
          style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <footer
        className={`text-center mt-20 text-pink-400 italic font-medium ${fadeInAnimation}`}
        style={{ animationDuration: '3s' }}
      >
        Designed to inspire and support every student’s unique career path.
      </footer>
    </section>
  );
};

export default CareerGuidanceWithVideo;
