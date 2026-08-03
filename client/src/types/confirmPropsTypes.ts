export default interface ConfirmProps {
  title: string,
  description: string,
  buttonColor: 'green'| 'red' | 'neutral',
  buttonText?: string,
  close?: () => void,
  action: () => void,
  isActive?: boolean
}