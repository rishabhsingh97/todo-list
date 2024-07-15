import React, { useState, MouseEvent } from 'react';

interface CardProps {
	children: React.ReactNode;
}

const CardEffect: React.FC<CardProps> = ({ children }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isActive, setIsActive] = useState(false);

	const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		if (rect) {
			setPosition({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});
		}
	};

	const onMouseEnter = () => {
		setIsActive(true);
	};

	const onMouseLeave = () => {
		setIsActive(false);
		setPosition({ x: 0, y: 0 });
	};

	const spotlightStyle = isActive
		? {
			background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 100%)`,
		}
		: {};

	return (
		<div
			onMouseMove={onMouseMove}
			onMouseEnter={onMouseEnter}
			style={spotlightStyle}
			onMouseLeave={onMouseLeave}
			className="cardEffect"
		>
			{children}
		</div>
	);
};

export default CardEffect;
