import React from "react";
import MetaDataInsert from "../lib/MetaDataInsert";
import data from "../lib/data";

const Home = () => {
	return (
		<>
			<MetaDataInsert title={data.metadata.name} />

			<section>
				<p>Home</p>
			</section>
		</>
	);
};

export default Home;
