import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isVisible && (
        <Button onClick={scrollToTop} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Back to top
        </Button>
      )}
    </div>
  );
};

export default BackToTopButton;
