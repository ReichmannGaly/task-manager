import { useLayoutEffect, useState } from "react";

const useLocalStorage = <T>(name: string) => {
  const [state, setState] = useState<T>();

  useLayoutEffect(() => {
    if (window) setState(JSON.parse(localStorage.getItem(name) || "{}"))
  }, [name])

  return {
    save: (values: T) => {
      localStorage.setItem(name, JSON.stringify(values || {}))
      setState(values)
    }, read: () => state
  }
}

export {
  useLocalStorage
}