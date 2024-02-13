import { useEffect, useMemo, useState } from "react";



export function UseMobileView() {
    const [viewState, setViewState] = useState({
        mobileView: false,
      });
    const { mobileView } = useMemo(() => viewState, [viewState]);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 910 ? setViewState((prevState) => ({ ...prevState, mobileView: true })) : setViewState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();
        window.addEventListener('resize', () => setResponsiveness());

        return () => {
            window.removeEventListener('resize', () => setResponsiveness());
        };
    }, []);

    return mobileView;
}



