export const Footer: React.FC = () => {
  return (
    <footer className='fixed inset-x-0 bottom-0 flex items-center justify-center gap-4 h-16 bg-gray-300 dark:bg-gray-800'>
      <p className='text-center text-sm leading-loose'>
        © {new Date().getFullYear()} WanderBuddy -{' '}
        <a href='https://github.com/adelansari/wander-buddy' className='text-blue-600 font-bold'>
          GitHub
        </a>
      </p>
    </footer>
  );
};
