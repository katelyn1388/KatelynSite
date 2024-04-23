import { useEffect, useMemo, useState } from "react";



export function UseMobileView() {
    const [viewState, setViewState] = useState({
        mobileView: false,
        tabletView: false
      });
    const { mobileView } = useMemo(() => viewState, [viewState]);
    const { tabletView } = useMemo(() => viewState, [viewState]);

    useEffect(() => {
        const setResponsiveness = () => {
            return (
                window.innerWidth < 910 && window.innerHeight > 650 ? 
                setViewState((prevState) => ({ ...prevState, mobileView: true, tablet: false })) : 
                window.innerHeight < 700 ? setViewState((prevState) => ({ ...prevState, mobileView: false, tabletView: true })) : 
                setViewState((prevState) => ({ ...prevState, mobileView: false, tabletView: false }))
            )
        };

        setResponsiveness();
        window.addEventListener('resize', () => setResponsiveness());

        return () => {
            window.removeEventListener('resize', () => setResponsiveness());
        };
    }, []);

    return { mobileView, tabletView };
}



