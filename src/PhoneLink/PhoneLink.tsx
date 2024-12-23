import styles from './styles.module.css'
interface PhoneLinkProps {
  num: number
}
export const PhoneLink = (props: PhoneLinkProps) => {
  const { num } = props
  const stringNum = num.toString()
  const areaCode = stringNum.substring(0, 3);
  const prefix = stringNum.substring(3, 6);
  const suffix = stringNum.substring(6, 10);
  return (
    <a href={`tel:${num}`} className={styles.phone}>
      ({areaCode}) {prefix} - {suffix}
    </a>
  )

}
