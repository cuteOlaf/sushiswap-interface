import React, { FC } from 'react'
import { useLingui } from '@lingui/react'
import HeadlessUIModal from '../../../../components/Modal/HeadlessUIModal'
import Button from '../../../../components/Button'
import { AdjustmentsIcon, CheckIcon, ChevronLeftIcon, XIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import Typography from '../../../../components/Typography'
import Switch from '../../../../components/Switch'
import { LiquidityMode } from '../../types'
import { useRecoilState, useRecoilValue } from 'recoil'
import { fixedRatioAtom, liquidityModeAtom } from '../../context/atoms'

const DepositSettingsModal: FC = () => {
  const { i18n } = useLingui()
  const liquidityMode = useRecoilValue(liquidityModeAtom)
  const [fixedRatio, setFixedRatio] = useRecoilState(fixedRatioAtom)

  // Only applies on standard mode
  if (liquidityMode !== LiquidityMode.STANDARD) {
    return null
  }

  return (
    <HeadlessUIModal
      trigger={
        <div className="flex items-center justify-center w-8 h-8 rounded cursor-pointer">
          <AdjustmentsIcon className="w-[26px] h-[26px] transform rotate-90" />
        </div>
      }
    >
      {({ setOpen }) => (
        <div className="flex flex-col gap-8 h-full">
          <div className="relative">
            <div className="pointer-events-none absolute w-full h-full bg-gradient-to-r from-opaque-blue to-opaque-pink opacity-20" />
            <div className="px-5 pt-5 pb-8 flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <Button
                  color="blue"
                  variant="outlined"
                  size="sm"
                  className="rounded-full py-1 pl-2 cursor-pointer"
                  startIcon={<ChevronLeftIcon width={24} height={24} />}
                  onClick={() => setOpen(false)}
                >
                  {i18n._(t`Back`)}
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="h2" weight={700} className="text-high-emphesis">
                  {i18n._(t`Deposit Settings`)}
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 px-5 gap-3">
            <div className="flex flex-row justify-between col-span-3 items-center">
              <Typography variant="h3" weight={700} className="text-high-emphesis">
                {fixedRatio ? i18n._(t`Fixed Ratio: On`) : i18n._(t`Fixed Ratio: Off`)}
              </Typography>
              <Switch
                checked={fixedRatio}
                onChange={() => setFixedRatio(!fixedRatio)}
                checkedIcon={<CheckIcon className="text-high-emphesis" />}
                uncheckedIcon={<XIcon className="text-high-emphesis" />}
                color="gradient"
              />
            </div>
            <Typography variant="xs" className="text-high-emphesis col-span-2">
              {i18n._(
                t`Auto-populate equal value amounts in other input fields, and require a balanced deposit amount.`
              )}
            </Typography>
            <div />
            <Typography variant="xxs" className="text-high-emphesis col-span-2">
              {i18n._(t`This was previously required of providing liquidity, but now is optional.`)}
            </Typography>
            <div />
          </div>
        </div>
      )}
    </HeadlessUIModal>
  )
}

export default DepositSettingsModal