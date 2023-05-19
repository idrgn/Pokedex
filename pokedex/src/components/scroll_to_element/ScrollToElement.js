import { useEffect, useRef } from "react";

import "./ScrollToElement.css";

export const ScrollToElement = (props) => {
	const targetRef = useRef(null);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
		};

		const handleIntersect = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (props.hasOwnProperty("onScrollToElement")) {
						props.onScrollToElement();
					}
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersect, options);

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => {
			observer.disconnect();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div ref={targetRef} className="scroll-to-element"></div>;
};
