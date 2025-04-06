import React from 'react'
import { FaGithub, FaLinkedin, FaUser } from 'react-icons/fa'

const About = () => {
  const teamMembers = [
    {
      name: 'Lakshya Agarwal',
      role: 'Web Developer',
      description: 'Frontend specialist with expertise in React.js and modern UI frameworks.',
      github: 'https://github.com/lakshya-agarwal',
      linkedin: 'https://linkedin.com/in/lakshya-agarwal',
    },
    {
      name: 'Aditya Gunjkar',
      role: 'Web Developer',
      description: 'Full-stack developer focusing on scalable architectures and blockchain integrations.',
      github: 'https://github.com/aditya-gg04',
      linkedin: 'https://linkedin.com/in/aditya-gunjkar',
    },
    {
      name: 'Nachiket',
      role: 'Smart Contract Developer',
      description: 'Blockchain specialist focusing on Ethereum smart contracts and Web3 integration.',
      github: 'https://github.com/nachiket',
      linkedin: 'https://linkedin.com/in/nachiket',
    },
  ]

  return (
    <div className='min-h-screen  dark:bg-gray-800 text-[#4b5161] dark:text-[#fdf5eb]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold tracking-tight mb-4'>
            About <span className='text-[#f58b44]'>MindChain</span>
          </h1>
          <p className='max-w-2xl mx-auto text-lg'>
            MindChain combines blockchain with mental wellness to create a rewarding mindfulness experience.
          </p>
        </div>
        <div className='py-2'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Meet Our Team</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='bg-white dark:bg-[#4b5161] rounded-lg overflow-hidden shadow-md hover:shadow-lg'>
                <div className='h-28 bg-[#f58b44] flex items-center px-5'>
                  <div className='w-20 h-20 rounded-full bg-[#fdf5eb] dark:bg-[#4b5161] flex items-center justify-center border-2 border-white mr-4'>
                    <FaUser size={32} className='text-[#4b5161] dark:text-[#fdf5eb]' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>{member.name}</h3>
                    <p className='text-[#fdf5eb] font-medium'>{member.role}</p>
                  </div>
                </div>
                <div className='p-5'>
                  <p className='mb-4'>{member.description}</p>
                  <div className='flex space-x-3'>
                    <a
                      href={member.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-[#fdf5eb] dark:bg-[#4b5161] hover:bg-[#f58b44] text-[#4b5161] dark:text-[#fdf5eb] hover:text-white p-2.5 rounded-full transition-colors'>
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={member.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-[#fdf5eb] dark:bg-[#4b5161] hover:bg-[#f58b44] text-[#4b5161] dark:text-[#fdf5eb] hover:text-white p-2.5 rounded-full transition-colors'>
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
