import Image from 'next/image';
import Hero from '@/assets/hero.svg'
import text from '@/language/portugues.json'

export default function Home() {
  return (
    <main className='flex items-center flex-col justify-center min-h-[calc(100vh-80px)]'>
      <h2 className='font-medium text-2xl mb-2'>{text.home.title1}</h2>
      <h3 className='font-bold text-3xl mb-8 text-blue-600 md:text-4xl'>{text.home.title2}</h3>
      <Image
        src={Hero}
        alt='Imagem principal da tela home'
        width={600}
        className='max-w-sm md:max-w-xl'
      />
    </main>    
  );
}
