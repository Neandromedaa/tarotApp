import './loadingFlares.scss';

interface LoadingFlaresProps {
    resultIsReady: boolean;
    onExitComplete?: () => void;
}

const LoadingFlares = ({ resultIsReady, onExitComplete }: LoadingFlaresProps) => {
    const handleAnimationEnd = (e: React.AnimationEvent<HTMLSpanElement>): void => {
        if (resultIsReady && e.animationName.includes('explode') && onExitComplete) {
            onExitComplete();
        }
    };

    return (
        <div
            className={`loading-flares${resultIsReady ? ' loading-flares--exploding' : ''}`}
            aria-hidden="true">
            <span
                className="loading-flares__blob loading-flares__blob--pink"
                onAnimationEnd={handleAnimationEnd}
            />
            <span className="loading-flares__blob loading-flares__blob--violet" />
            <span className="loading-flares__blob loading-flares__blob--blue" />
        </div>
    );
};

export default LoadingFlares;
