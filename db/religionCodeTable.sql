-- downloaded from http://gdeltproject.org/data/lookups/CAMEO.religion.txt
CREATE TABLE religioncode (
  code varchar(3) PRIMARY KEY ,
  label text
);

INSERT INTO religioncode VALUES
  ( 'ADR', 'African Diasporic Religion' ),
  ( 'ALE', 'Alewi' ),
  ( 'ATH', 'Agnostic' ),
  ( 'BAH', 'Bahai Faith' ),
  ( 'BUD', 'Buddhism' ),
  ( 'CHR', 'Christianity' ),
  ( 'CON', 'Confucianism' ),
  ( 'CPT', 'Coptic' ),
  ( 'CTH', 'Catholic' ),
  ( 'DOX', 'Orthodox' ),
  ( 'DRZ', 'Druze' ),
  ( 'HIN', 'Hinduism' ),
  ( 'HSD', 'Hasidic' ),
  ( 'ITR', 'Indigenous Tribal Religion' ),
  ( 'JAN', 'Jainism' ),
  ( 'JEW', 'Judaism' ),
  ( 'JHW', 'Jehovah''s Witness' ),
  ( 'LDS', 'Latter Day Saints' ),
  ( 'MOS', 'Muslim' ),
  ( 'MRN', 'Maronite' ),
  ( 'NRM', 'New Religious Movement' ),
  ( 'PAG', 'Pagan' ),
  ( 'PRO', 'Protestant' ),
  ( 'SFI', 'Sufi' ),
  ( 'SHI', 'Shia' ),
  ( 'SHN', 'Old Shinto School' ),
  ( 'SIK', 'Sikh' ),
  ( 'SUN', 'Sunni' ),
  ( 'TAO', 'Taoist' ),
  ( 'UDX', 'Ultra-Orthodox' ),
  ( 'ZRO', 'Zoroastrianism' );
