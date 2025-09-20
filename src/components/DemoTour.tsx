import { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

interface DemoTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoTour({ isOpen, onClose }: DemoTourProps) {
  useEffect(() => {
    if (isOpen) {
      const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          classes: 'shadow-md rounded-lg',
          scrollTo: true,
          cancelIcon: {
            enabled: true
          }
        }
      });

      tour.addSteps([
        {
          id: 'welcome',
          text: 'Welcome to Momentum! Let us show you around our career development platform.',
          attachTo: {
            element: 'body',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Skip Tour',
              action: () => {
                tour.complete();
                onClose();
              },
              classes: 'shepherd-button-secondary'
            },
            {
              text: 'Next',
              action: () => tour.next()
            }
          ]
        },
        {
          id: 'career-mapping',
          text: 'Explore different career paths and map out your professional journey.',
          attachTo: {
            element: '[data-tour="career-mapping"]',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Back',
              action: () => tour.back()
            },
            {
              text: 'Next',
              action: () => tour.next()
            }
          ]
        },
        {
          id: 'skill-analysis',
          text: 'Analyze your current skills and identify areas for improvement.',
          attachTo: {
            element: '[data-tour="skill-analysis"]',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Back',
              action: () => tour.back()
            },
            {
              text: 'Next',
              action: () => tour.next()
            }
          ]
        },
        {
          id: 'market-insights',
          text: 'Get real-time market insights and job trends in your field.',
          attachTo: {
            element: '[data-tour="market-insights"]',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Back',
              action: () => tour.back()
            },
            {
              text: 'Next',
              action: () => tour.next()
            }
          ]
        },
        {
          id: 'finish',
          text: 'Ready to start your career development journey? Login now to access all features!',
          attachTo: {
            element: 'body',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Finish',
              action: () => {
                tour.complete();
                onClose();
              }
            }
          ]
        }
      ]);

      tour.start();

      return () => {
        tour.complete();
      };
    }
  }, [isOpen, onClose]);

  return null;
}