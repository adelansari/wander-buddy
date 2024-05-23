export const Footer: React.FC = () => {
  return (
    <footer className='fixed inset-x-0 bottom-0 flex items-center justify-center gap-4 min-h-[3rem] md:h-20 py-2'>
      <p className='text-center text-sm leading-loose text-muted-foreground md:text-center'>
        &copy; {new Date().getFullYear()} WanderBuddy -{' '}
        <a href='https://github.com/adelansari/wander-buddy' className='text-blue-600 font-bold'>
          GitHub
        </a>{' '}
      </p>
    </footer>
  );
};
