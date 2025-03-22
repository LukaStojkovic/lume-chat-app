import React from "react";
import { motion } from "framer-motion";

export default function AuthMotionScreen({ title, subtitle }) {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{
        background: "linear-gradient(135deg, #FBBF24 0%, #F472B6 100%)",
      }}
      animate={{
        background: [
          "linear-gradient(135deg, #FBBF24 0%, #F472B6 100%)",
          "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
          "linear-gradient(135deg, #FBBF24 0%, #F472B6 100%)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <div className="text-center text-white space-y-4">
        <h2 className="text-4xl font-extrabold">{title}</h2>
        <p className="text-lg max-w-md mx-auto">{subtitle}</p>
      </div>
    </motion.div>
  );
}
