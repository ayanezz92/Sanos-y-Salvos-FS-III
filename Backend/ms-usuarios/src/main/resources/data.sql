-- 1. Limpieza radical terminada en doble barra
DROP FUNCTION IF EXISTS sp_buscar_usuario_por_email(VARCHAR) //

-- 2. Crear la funcion (Spring ignorara los ';' de adentro y cortara solo en el '//' del final)
CREATE OR REPLACE FUNCTION sp_buscar_usuario_por_email(p_email VARCHAR)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
v_id BIGINT;
BEGIN
SELECT id INTO v_id
FROM usuarios
WHERE email = LOWER(TRIM(p_email))
    LIMIT 1;

RETURN v_id;
END;
$$ //

-- 3. Inyeccion segura terminada en doble barra
INSERT INTO usuarios (nombre, email, password)
SELECT 'Gerardo Staff', 'gerardo@sanossalvos.cl', 'adminpassword123'
    WHERE NOT EXISTS (
    SELECT 1 FROM usuarios WHERE email = 'gerardo@sanossalvos.cl'
) //