import React, { useEffect, useState } from "react";
import "./css/SellixEmbed.css";

interface SellixEmbedProps {
	productId?: string;
	groupId?: string;
	children: React.ReactNode;
}

const SellixEmbed: React.FC<SellixEmbedProps> = ({
	productId,
	groupId,
	children,
}) => {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const modalCloseHandler = (event: MessageEvent) => {
			if (event.data === "close-embed") {
				setShowModal(false);
			}
		};

		window.addEventListener("message", modalCloseHandler);

		return () => {
			window.removeEventListener("message", modalCloseHandler);
		};
	}, []);

	const handleEmbedButtonClick = () => {
		setShowModal(true);
	};

	const modalClose = () => {
		setShowModal(false);
	};

	let iframeUrl;

	if (productId) {
		iframeUrl = `https://embed.sellix.io/product/${productId}`;
	} else if (groupId) {
		iframeUrl = `https://embed.sellix.io/group/${groupId}`;
	}

	return (
		<>
			<button onClick={handleEmbedButtonClick}>{children}</button>
			{showModal && (
				<div className="sellix-modal">
					<div className="sellix-backdrop" onClick={modalClose}></div>
					<div className="sellix-iframe-wrapper">
						<div className="sellix-iframe-content">
							<div className="sellix-iframe-loader-container">
								<img
									src="https://cdn.sellix.io/static/embed/loader.png"
									alt="Loader"
									className="sellix-iframe-loader"
									style={{ width: "35px" }}
								/>
							</div>
							<iframe
								src={iframeUrl}
								className="sellix-iframe"
								title="Sellix Embed"
								onLoad={() => {
									const loader = document.querySelector(
										".sellix-iframe-loader-container"
									);
									if (loader) {
										loader.remove();
									}
								}}
							></iframe>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SellixEmbed;
