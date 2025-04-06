import React from 'react'
import { FaGithub, FaLinkedin, FaUser } from 'react-icons/fa'

const About = () => {
  // Team members data - you can easily update this
  const teamMembers = [
    {
      name: 'Lakshya Agarwal',
      role: 'Web Developer',
      description:
        'Frontend specialist with expertise in React.js and modern UI frameworks.',
      github: 'https://github.com/lakshya-agarwal',
      linkedin: 'https://linkedin.com/in/lakshya-agarwal',
      imageUrl: '',
    },
    {
      name: 'Aditya Gunjkar',
      role: 'Web Developer',
      description:
        'Full-stack developer focusing on scalable architectures and blockchain integrations.',
      github: 'https://github.com/aditya-gg04',
      linkedin: 'https://linkedin.com/in/aditya-gunjkar',
      imageUrl: '',
    },
    {
      name: 'Nachiket',
      role: 'Smart Contract Developer',
      description:
        'Blockchain specialist focusing on Ethereum smart contracts and Web3 integration.',
      github: 'https://github.com/nachiket',
      linkedin: 'https://linkedin.com/in/nachiket',
      imageUrl: '',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20'>
        {/* About MindChain Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4'>
            About{' '}
            <span className='text-blue-600 dark:text-blue-400'>MindChain</span>
          </h1>
          <p className='max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300'>
            MindChain combines blockchain with mental wellness to create a
            rewarding mindfulness experience. Users earn SOUL tokens for
            completing wellness activities, creating a sustainable ecosystem.
          </p>
        </div>

        {/* Team Section */}
        <div className='py-2'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
            Meet Our Team
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg'>
                <div className='h-28 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center px-5'>
                  {/* Increased size of the circle and fixed padding */}
                  <div className='w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800 mr-4'>
                    <FaUser
                      size={32}
                      className='text-gray-400 dark:text-gray-500'
                    />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      {member.name}
                    </h3>
                    <p className='text-blue-100 font-medium'>{member.role}</p>
                  </div>
                </div>

                <div className='p-5'>
                  <p className='text-gray-600 dark:text-gray-300 mb-4'>
                    {member.description}
                  </p>

                  <div className='flex space-x-3'>
                    <a
                      href={member.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 p-2.5 rounded-full transition-colors'
                      aria-label={`${member.name}'s GitHub`}>
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={member.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 p-2.5 rounded-full transition-colors'
                      aria-label={`${member.name}'s LinkedIn`}>
                      <FaLinkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
