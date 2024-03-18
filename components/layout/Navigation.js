import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavigationLinks } from '@/data/NavigationLinks';




const Navigation = () => {
	return (
		<div className='mb-12 sticky top-4 bg-light/95 z-40'>
			<DesktopNavigation />
            <MobileNavigation />
		</div>
	);
};

export default Navigation;

const DesktopNavigation = () => {
	return (
		<div className='hidden lg:block border-t max-w-7xl mx-auto px-2 border-primary mt-2'>
			<div className='mt-[2px] border-y border-primary py-4 flex items-center justify-around'>
				{NavigationLinks.map((link) => (
					<Link key={link.id} href={link.slug}>
						<div className='text-lg border-x px-4 border-primary hover:border-x-2   hover:border-x-dark hover:scale-110 transition duration-700'>
							{link.name}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

const MobileNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Animation variants for Framer Motion
    const menuVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <>
            <div className='lg:hidden  p-4'>
                <div className='flex justify-between items-center '>
                    <div>
                      
                    </div>
                    <button onClick={toggleMenu} className='text-2xl'>
                    <AiOutlineMenu />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className='fixed top-0 left-0 h-full w-full bg-light/80 backdrop-blur-sm flex items-center justify-center z-50'
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.5 }}
                    >
                        <div className='grid grid-cols-1 gap-10 p-4'>
                            {NavigationLinks.map((link) => (
                                <motion.div key={link.id} className='w-full text-center'
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1.1, delay: .3 }}
                                >
                                    <Link href={link.slug}>
                                        <span className='inline-block font-bold w-full py-3 px-8 text-lg  border-x border-primary cursor-pointer hover:border-dark hover:scale-110 hover:border-x-0 hover:border-y transition duration-300' onClick={toggleMenu}>
                                            {link.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                            <button onClick={toggleMenu} className='text-2xl absolute top-4 right-4 text-dark'>
                            <AiOutlineClose />

                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};



// The DesktopNavigation component is a simple list of links that are displayed when the screen size is large. The MobileNavigation component is a bit more complex. It uses the useState hook to manage the state of the menu. The toggleMenu function is used to open and close the menu. The menuVariants object is used to define the animation for the menu. The AnimatePresence component is used to animate the menu when it appears and disappears. Inside the AnimatePresence component, we have a motion.div component that contains the menu items. The motion.div component uses the menuVariants object to animate the menu. The Link component is used to create the menu items. The onClick event handler is used to close the menu when a menu item is clicked. The button at the bottom of the menu is used to close the menu. The onClick event handler is used to call the toggleMenu function to close the menu.
