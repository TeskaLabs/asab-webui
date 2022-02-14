export const formatIntoTree = (inputArray) => {
	const outputArray = [];
	inputArray.forEach((element) => addTreeStructure(element, outputArray));
	return outputArray;
}

const addTreeStructure = (element, outputArray) => {
	if (element != null && element["type"] === "directory") {
		Object.keys(element).forEach((key) => {
			if (key == "type") return;

			const obj = {
				type: "folder",
				key: key,
				label: key,
				nodes: []
			};
			outputArray.push(obj);

			const index = outputArray.indexOf(obj);

			element[key].forEach((e) => {
				if (e != null && e["type"] === "directory") {
					addTreeStructure(e, outputArray[index].nodes);
				} else if (e != null && e["type"] === "file") {
					const strObj = {
						type: "file",
						key: e["file_name"],
						label: e["file_name"],
						isDisabled: e["is_disabled"] ? true : false
					};
					outputArray[index].nodes.push(strObj);
				}
			})
		})
	} else if (element["type"] === "file") {
		outputArray.push(
			{
				type: "file",
				key: element["file_name"],
				label: element["file_name"],
				isDisabled: element["is_disabled"] ? true : false
			}
		);
	}
}