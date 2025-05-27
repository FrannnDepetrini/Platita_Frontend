import styles from './SearchInput.module.css'
import { useState, useEffect, useRef, useMemo, useCallback, cache } from 'react'



export default function SearchInput({ onChange }) {
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [provinciaInput, setProvinciaInput] = useState("");
    const [ciudadInput, setCiudadInput] = useState("");
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    const [loading, setLoading] = useState(false);
    const prevProvinciaRef = useRef("");

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
            localStorage.removeItem("ciudades")
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
                    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${encodeURIComponent(provinciaSeleccionada)}&max=100&campos=nombre`,
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

    const filterProvincias = useMemo(() => (
        provincias
            .filter(prov => prov.toLowerCase().includes(provinciaInput.toLowerCase()))
            .slice(0, 3)
    ), [provincias, provinciaInput]);

    const filterCitys = useMemo(() => (
        ciudades
            .filter(ciudad => ciudad.toLowerCase().includes(ciudadInput.toLowerCase()))
            .slice(0, 3)
    ), [ciudades, ciudadInput]);

    const handleProvinciaChange = (e) => {
        const newValue = e.target.value;
        setProvinciaInput(newValue);

        if (newValue.length === 3) {
            setProvinciaSeleccionada("");
        }

        if (provincias.includes(newValue)) {
            setProvinciaSeleccionada(newValue);
            onChange({
                target:{ 
                    name: 'provincia', 
                    value: newValue
                }
            });
        }
    };

    const handleProvinciaBlur = () => {
        if (!provincias.includes(provinciaInput)) {
            setProvinciaInput("");
            setProvinciaSeleccionada("");
            onChange({
                target: { 
                    name: 'provincia', 
                    value: '' 
                }
            });
        }
    };

    const handleCiudadChange = useCallback((e) => {
        const newValue = e.target.value;
        setCiudadInput(newValue);
        onChange({
            target: { 
                name: 'ciudad', 
                value: newValue 
            }
        });
    }, [provinciaSeleccionada, onChange]);

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
                    disabled={loading}
                />
                <datalist id="provinciasList">
                    {filterProvincias.map((provincia, index) => (
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
                    disabled={!provinciaSeleccionada}
                    placeholder="Ciudad"
                />
                <datalist id="ciudadesList">
                    {filterCitys.map((ciudad, index) => (
                        <option key={index} value={ciudad} />
                    ))}
                </datalist>
            </div>
        </div>
    );
}


