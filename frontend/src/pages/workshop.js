import WorkshopCard from '../components/workshopCard'
import image1 from '../images/404-image.png'

const workshop = () => {
    return (
        <div className='flex items-start justify-start flex-col  dark:bg-gray-800 text-[#4b5161] dark:text-[#fdf5eb]'>
            <div className='flex px-20 py-10 justify-center items-center w-screen'>
                <div className='2xl:text-5xl lg:text-6xl md:text-5xl sm:text-4xl text-4xl font-bold'>
                    Workshops
                </div>
            </div>
            <div className='flex flex-col w-screen justify-evenly'>
                <div className='flex flex-row items-center justify-evenly py-10'>
                    <WorkshopCard
                        heading={'How to calm yourself'}
                        token={1.5}
                        imgsrc={image1}
                        link1={'/colormatching'}
                    />
                    <WorkshopCard
                        heading={'How to stop worrying and start living'}
                        token={4}
                        imgsrc={image1}
                        link1={'/meditate'}
                    />
                </div>
                <div className='flex flex-row items-center justify-evenly py-10'>
                    <WorkshopCard
                        heading={'The secret of open eye meditation'}
                        token={4}
                        imgsrc={image1}
                        link1={'/colormatching'}
                    />
                    <WorkshopCard
                        heading={'Breathe in! Breathe out!'}
                        token={5}
                        imgsrc={image1}
                        link1={'/colormatching'}
                    />
                </div>
            </div>
        </div>
    )
}

export default workshop
