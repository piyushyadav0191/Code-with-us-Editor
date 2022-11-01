import { createContext } from "react";

 export const TitleContext = createContext()

export const TitleProvider = ({children}) => {
	<TitleContext.Provider title="CODE WITH US">
		{children}
	</TitleContext.Provider>
}
