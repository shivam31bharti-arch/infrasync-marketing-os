"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type ModuleProps = {
  title: string;
  description: React.ReactNode;
  index: number;
};

export default function CurriculumModule({ title, description, index }: ModuleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card card--curriculum"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "inherit", padding: 0 }}
      >
        <h3 style={{ margin: 0, fontSize: "1.125rem", display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
          <span className="mono text-electric" style={{ fontSize: "0.875rem" }}>0{index + 1}</span>
          {title}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div className="muted" style={{ paddingTop: "var(--space-md)", lineHeight: 1.7 }}>
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
