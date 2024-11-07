import styles from './CustomCheckbox.module.scss';

interface CustomCheckboxProps {
  className?: string;
}

export function CustomCheckbox({ className }: Readonly<CustomCheckboxProps>) {
  const externalClass = className ? ` ${className}` : '';

  return (
    <div className={styles.CustomContainer + externalClass}>
      <input
        type="checkbox"
        name="test"
        id="test"
        className={styles.CustomCheckbox}
        value="Электронные кодовые замки"
      />
      <label htmlFor="test" className={styles.CustomLabel}>
        Электронные кодовые замки
      </label>
    </div>
  );
}
