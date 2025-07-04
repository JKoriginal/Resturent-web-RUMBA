import React, { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {

    const contentRef = useRef();
    const [currentIndex, setcurrentIndex] = useState(0);

    useGSAP(() => {

        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' })
        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 100, ease: 'power1.inOut' })
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 100, ease: 'power1.inOut' })
    }, [currentIndex])




    const totalcocktails = sliderLists.length

    const goToSlide = (index) => {
        const newIndex = (index + totalcocktails) % totalcocktails

        setcurrentIndex(newIndex);

    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalcocktails) % totalcocktails]
    }

    const currentCocktail = getCocktailAt(0);
    const Prevcocktail = getCocktailAt(-1);
    const Nextcocktail = getCocktailAt(1);

    return (
        <section id='menu' area-labelledby='menu-heading'>
            <img src="images/slider-left-leaf.png" alt="left-leaf" id='m-left-leaf' />
            <img src="images/slider-right-leaf.png" alt="right-leaf" id='m-right-leaf' />

            <h2 id='menu-heading' className='sr-only'>
                Cocktail Menu
            </h2>
            <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                {sliderLists.map((cocktail, index) => {
                    const isActive = index == currentIndex;

                    return (
                        <button key={cocktail.id} className={`${isActive
                            ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                            onClick={() => {
                                goToSlide(index)
                            }}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>
            <div className='content'>
                <div className='arrows'>
                    <button className='text-left' onClick={() => { goToSlide(currentIndex - 1) }}>
                        <span>{Prevcocktail.name}</span>
                        <img src="images/right-arrow.png" alt="rigt-arrow" aria-hidden="true" />
                    </button>

                    <button className='text-left' onClick={() => { goToSlide(currentIndex + 1) }}>
                        <span>{Nextcocktail.name}</span>
                        <img src="images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>
                </div>

                <div className='cocktail'>
                    <img src={currentCocktail.image} alt="cocktail-img" className='object-contain' />
                </div>

                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for : </p>
                        <p id='title'>{currentCocktail.name}</p>
                    </div>

                    <div className='details'>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Menu