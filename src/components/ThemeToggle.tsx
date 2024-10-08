import { useEffect, useState } from 'preact/hooks'
import type { FunctionalComponent } from 'preact'

export default function ThemeToggle(): FunctionalComponent {
    const [theme, setTheme] = useState(
        window.localStorage.getItem('theme') ?? 'light'
    )

    const toggle = () => {
        const lightSound = new Audio('/sound/R2-D2.mp3')
        const darkSound = new Audio('/sound/Darth-Vader.mp3')
        setTheme(theme === 'light' ? 'dark' : 'light')
        theme === 'light' ? darkSound.play() : lightSound.play()
    }
    const handleClick = () => {
        toggle()
    }

    function handleKeyDown({ key }) {
        if (key === 'Enter') toggle()
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            document
                .querySelector('html')
                ?.setAttribute('data-theme', 'dracula')
        } else {
            document.documentElement.classList.remove('dark')
            document
                .querySelector('html')
                ?.setAttribute('data-theme', 'emerald')
        }
        window.localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <div
            role="checkbox"
            aria-checked={theme === 'dark' ? 'true' : 'false'}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            class={`cursor-pointer w-16 h-8 bg-primary rounded-full relative px-1.5 `}
        >
            {/* <div class={`w-7 h-7 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 ${theme === "dark" ? 'translate-x-8' : 'translate-x-0'}`} /> */}
            <div
                class={`w-7 h-7 z-50 top-0.5 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 dark:translate-x-8 translate-x-0`}
            />
            <div class="absolute top-1.5 left-1.5">
                <svg
                    class="fill-current z-10 text-white"
                    width="20"
                    height="20"
                    viewBox="0 0 496 512"
                >
                    <path
                        fill="currentColor"
                        d="M248 504C111.25 504 0 392.75 0 256S111.25 8 248 8s248 111.25 248 248s-111.25 248-248 248zm0-479.47C120.37 24.53 16.53 128.37 16.53 256S120.37 487.47 248 487.47S479.47 383.63 479.47 256S375.63 24.53 248 24.53zm27.62 21.81v24.62a185.933 185.933 0 0 1 83.57 34.54l17.39-17.36c-28.75-22.06-63.3-36.89-100.96-41.8zm-55.37.07c-37.64 4.94-72.16 19.8-100.88 41.85l17.28 17.36h.08c24.07-17.84 52.55-30.06 83.52-34.67V46.41zm12.25 50.17v82.87c-10.04 2.03-19.42 5.94-27.67 11.42l-58.62-58.59l-21.93 21.93l58.67 58.67c-5.47 8.23-9.45 17.59-11.47 27.62h-82.9v31h82.9c2.02 10.02 6.01 19.31 11.47 27.54l-58.67 58.69l21.93 21.93l58.62-58.62a77.873 77.873 0 0 0 27.67 11.47v82.9h31v-82.9c10.05-2.03 19.37-6.06 27.62-11.55l58.67 58.69l21.93-21.93l-58.67-58.69c5.46-8.23 9.47-17.52 11.5-27.54h82.87v-31h-82.87c-2.02-10.02-6.03-19.38-11.5-27.62l58.67-58.67l-21.93-21.93l-58.67 58.67c-8.25-5.49-17.57-9.47-27.62-11.5V96.58h-31zm183.24 30.72l-17.36 17.36a186.337 186.337 0 0 1 34.67 83.67h24.62c-4.95-37.69-19.83-72.29-41.93-101.03zm-335.55.13c-22.06 28.72-36.91 63.26-41.85 100.91h24.65c4.6-30.96 16.76-59.45 34.59-83.52l-17.39-17.39zM38.34 283.67c4.92 37.64 19.75 72.18 41.8 100.9l17.36-17.39c-17.81-24.07-29.92-52.57-34.51-83.52H38.34zm394.7 0c-4.61 30.99-16.8 59.5-34.67 83.6l17.36 17.36c22.08-28.74 36.98-63.29 41.93-100.96h-24.62zM136.66 406.38l-17.36 17.36c28.73 22.09 63.3 36.98 100.96 41.93v-24.64c-30.99-4.63-59.53-16.79-83.6-34.65zm222.53.05c-24.09 17.84-52.58 30.08-83.57 34.67v24.57c37.67-4.92 72.21-19.79 100.96-41.85l-17.31-17.39h-.08z"
                    />
                </svg>
            </div>
            <div class="absolute top-1.5 right-1.5">
                <svg
                    class="fill-current z-10 text-base"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M256.5 504C117.2 504 9 387.8 13.2 249.9C16 170.7 56.4 97.7 129.7 49.5c.3 0 1.9-.6 1.1.8c-5.8 5.5-111.3 129.8-14.1 226.4c49.8 49.5 90 2.5 90 2.5c38.5-50.1-.6-125.9-.6-125.9c-10-24.9-45.7-40.1-45.7-40.1l28.8-31.8c24.4 10.5 43.2 38.7 43.2 38.7c.8-29.6-21.9-61.4-21.9-61.4L255.1 8l44.3 50.1c-20.5 28.8-21.9 62.6-21.9 62.6c13.8-23 43.5-39.3 43.5-39.3l28.5 31.8c-27.4 8.9-45.4 39.9-45.4 39.9c-15.8 28.5-27.1 89.4.6 127.3c32.4 44.6 87.7-2.8 87.7-2.8c102.7-91.9-10.5-225-10.5-225c-6.1-5.5.8-2.8.8-2.8c50.1 36.5 114.6 84.4 116.2 204.8C500.9 400.2 399 504 256.5 504z"
                    />
                </svg>
            </div>
        </div>
    )
}

