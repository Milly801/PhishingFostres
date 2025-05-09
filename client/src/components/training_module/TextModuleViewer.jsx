import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useProgress } from './ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

const TextModuleViewer = ({ module, onClose }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [readSections, setReadSections] = useState(new Set());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const contentRef = useRef(null);
    const { updateModuleProgress } = useProgress();

    const { sections } = module.content;

    // Track reading progress
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setReadSections(prev => {
                            const newSet = new Set(prev);
                            newSet.add(entry.target.id);
                            return newSet;
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        const elements = contentRef.current?.querySelectorAll('.section');
        elements?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [currentSection]);

    // Update progress when sections are read
    useEffect(() => {
        const progress = (readSections.size / sections.length) * 100;
        updateModuleProgress(module.id, progress);
    }, [readSections, sections.length, module.id, updateModuleProgress]);

    const handleNext = async () => {
        if (currentSection < sections.length - 1) {
            setIsTransitioning(true);
            await new Promise(resolve => setTimeout(resolve, 300)); // Wait for exit animation
            setCurrentSection(prev => prev + 1);
            setIsTransitioning(false);
        } else {
            onClose();
        }
    };

    const handlePrevious = async () => {
        if (currentSection > 0) {
            setIsTransitioning(true);
            await new Promise(resolve => setTimeout(resolve, 300)); // Wait for exit animation
            setCurrentSection(prev => prev - 1);
            setIsTransitioning(false);
        }
    };

    // Add a function to format the progress percentage
    const formatProgress = (progress) => {
        return Math.round(progress);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a192f]/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#112240] rounded-lg border border-[#233554] w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
                <div className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                        <motion.h2
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-xl sm:text-2xl font-bold"
                        >
                            {module.title}
                        </motion.h2>
                        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-sm text-gray-400"
                            >
                                Progress: {formatProgress((readSections.size / sections.length) * 100)}%
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="text-gray-400 hover:text-[#64ffda] transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </motion.button>
                        </div>
                    </div>

                    <div ref={contentRef} className="prose prose-invert max-w-none overflow-y-auto max-h-[60vh] sm:max-h-[65vh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSection}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                id={`section-${currentSection}`}
                                className={`section mb-8 ${readSections.has(`section-${currentSection}`) ? 'opacity-100' : 'opacity-60'}`}
                            >
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#64ffda]"
                                >
                                    {sections[currentSection].title}
                                </motion.h3>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="whitespace-pre-line text-gray-300 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base"
                                >
                                    {sections[currentSection].content.split('\n\n').map((paragraph, pIndex) => (
                                        <motion.p
                                            key={pIndex}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 + (pIndex * 0.1) }}
                                            className="mb-3 sm:mb-4"
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-between mt-4 sm:mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePrevious}
                            disabled={currentSection === 0}
                            className="px-3 sm:px-4 py-2 rounded-md bg-[#233554] text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            className="px-4 sm:px-6 py-2 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors flex items-center text-sm sm:text-base"
                        >
                            {currentSection < sections.length - 1 ? 'Next' : 'Finish'}
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TextModuleViewer;
