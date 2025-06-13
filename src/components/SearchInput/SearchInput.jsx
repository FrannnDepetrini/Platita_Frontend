import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styles from "./SearchInput.module.css";

export default function SearchInput({ onChange, province = "", city = "", isDisabled = false }) {
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [provinciaInput, setProvinciaInput] = useState(province);
    const [ciudadInput, setCiudadInput] = useState(city);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(province); 
    const [loading, setLoading] = useState(false);
    const prevProvinciaRef = useRef("");

    useEffect(() => {
        setProvinciaInput(province);
        setProvinciaSeleccionada(province);
    }, [province]);

    useEffect(() => {
        setCiudadInput(city);
    }, [city]);

    useEffect(() => {
        setLoading(true);
        const cache_p = localStorage.getItem("provincias");

        if (cache_p) {
            setProvincias(JSON.parse(cache_p));
            setLoading(false);
            return;
        }

        fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre")
            .then((res) => res.json())
            .then((data) => {
                const nombresProvincias = data.provincias.map((p) => p.nombre);
                localStorage.setItem("provincias", JSON.stringify(nombresProvincias));
                setProvincias(nombresProvincias);
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        return () => {
            localStorage.removeItem("provincias");
            localStorage.removeItem("ciudades");
        }
    }, []);

    useEffect(() => {
        if (!provinciaSeleccionada) {
            setCiudades([]);
            return;
        }

        const abortController = new AbortController();

        const fetchCiudades = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${encodeURIComponent(provinciaSeleccionada)}&max=500&campos=nombre`,
                    { signal: abortController.signal }
                );
                const data = await res.json();
                const nombresCiudades = data.municipios.map((m) => m.nombre);
                localStorage.setItem(`ciudades`, JSON.stringify(nombresCiudades));
                setCiudades(nombresCiudades);
                prevProvinciaRef.current = provinciaSeleccionada;
                
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCiudades();
        return () => abortController.abort();
    }, [provinciaSeleccionada]);

    const provinciasFiltradas = useMemo(() => (
        provincias
            .filter(prov => prov.toLowerCase().includes(provinciaInput.toLowerCase()))
            .slice(0, 5)
    ), [provincias, provinciaInput]);

    const ciudadesFiltradas = useMemo(() => (
        ciudades
            .filter(ciudad => ciudad.toLowerCase().includes(ciudadInput.toLowerCase()))
            .slice(0, 5)
    ), [ciudades, ciudadInput]);

    const handleProvinciaChange = (e) => {
        const newValue = e.target.value;
        setProvinciaInput(newValue);

        if (newValue.length <= 2) {
            setProvinciaSeleccionada("");
            setCiudadInput("");
            onChange({ target: { name: "province", value: "" } });
            onChange({ target: { name: "city", value: "" } });
            return;
        }

        if (provincias.includes(newValue)) {
            setProvinciaSeleccionada(newValue);
            setCiudadInput("");
            onChange({ target: { name: "province", value: newValue } });
            onChange({ target: { name: "city", value: "" } });
        } else {
            setProvinciaSeleccionada("");
            onChange({ target: { name: "province", value: newValue } });
        }
    };

    const handleProvinciaBlur = () => {
        if (!provincias.includes(provinciaInput)) {
            const provinciaEncontrada = provincias.find(p => 
                p.toLowerCase().includes(provinciaInput.toLowerCase())
            );
            
            if (provinciaEncontrada && provinciaInput.length > 2) {
                setProvinciaInput(provinciaEncontrada);
                setProvinciaSeleccionada(provinciaEncontrada);
                onChange({ target: { name: "province", value: provinciaEncontrada } });
            }
        }
    };

    const handleCiudadChange = useCallback((e) => {
        const newValue = e.target.value;
        setCiudadInput(newValue);
        onChange({ target: { name: "city", value: newValue } });
    }, [onChange]);

    return (
        <div className={styles.container_inputs}>
            <div className={styles.c_input1}>
                <input
                    className={styles.input_field}
                    list="provinciasList"
                    value={provinciaInput}
                    onChange={handleProvinciaChange}
                    onBlur={handleProvinciaBlur}
                    placeholder={loading ? "Cargando..." : "Provincia"}
                    disabled={isDisabled}
                />
                <datalist id="provinciasList">
                    {provinciasFiltradas.map((provincia, index) => (
                        <option key={index} value={provincia} />
                    ))}
                </datalist>
            </div>

            <div className={styles.separator}>
                <span className={styles.bar}>/</span>
            </div>

            <div className={styles.c_input2}>
                <input
                    className={styles.input_field}
                    list="ciudadesList"
                    value={ciudadInput}
                    onChange={handleCiudadChange}
                    disabled={!provinciaSeleccionada || isDisabled}
                    placeholder={loading ? "Cargando..." : "Ciudad"}
                />
                <datalist id="ciudadesList">
                    {ciudadesFiltradas.map((ciudad, index) => (
                        <option key={index} value={ciudad} />
                    ))}
                </datalist>
            </div>
        </div>
    );
}