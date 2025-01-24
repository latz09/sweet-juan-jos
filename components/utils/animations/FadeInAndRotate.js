'use client';
import { motion } from 'framer-motion';

const FadeInAndRotate = ({ children, className, ...rest }) => {
    return (
        <>
            <motion.div
                className={className}
                initial={{ y: 30, opacity: 0, rotate: -15 }} // Added slight initial rotation
                whileInView={{ y: 0, opacity: 1, rotate: 0 }} // Reset rotation to 0
                transition={{ duration: 0.9, delay: .2 }}
                viewport={{ once: true }}
                {...rest}
            >
                <div>{children}</div>
            </motion.div>
        </>
    );
};

export default FadeInAndRotate;
