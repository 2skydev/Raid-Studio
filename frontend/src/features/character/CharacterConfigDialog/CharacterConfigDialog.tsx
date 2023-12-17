import { ComponentProps } from 'react'

import { css } from '@styled-system/css'
import { Divider } from '@styled-system/jsx'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import {
  Form,
  FormHeader,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/Form'
import SelectMultiple from '@/components/SelectMultiple'
import VerticalTabsTemplate from '@/components/VerticalTabsTemplate'

import RaidRoot from '@/features/raid/RaidRoot'

import { RAIDS_ARRAY_GROUP_BY_NAME } from '@/assets/data/raid'
import useCustomForm from '@/hooks/useCustomForm'

export interface CharacterConfigDialogProps
  extends Omit<ComponentProps<typeof Dialog>, 'children'> {
  characterName: string
}

const CharacterConfigDialog = ({ characterName, ...props }: CharacterConfigDialogProps) => {
  const form = useCustomForm<{
    selectedRaidNames: string[]
  }>({
    defaultValues: {
      selectedRaidNames: [],
    },
  })

  const selectedRaidNames = form.watch('selectedRaidNames')

  const handleChangeSelectedRaidNames = (values: string[]) => {
    if (values.length > 3) return
    form.setValue('selectedRaidNames', values)
  }

  return (
    <Dialog {...props}>
      <DialogContent top="10%" translateY="0" maxW="5xl" py="10" px="10">
        <DialogHeader>
          <DialogTitle>캐릭터 설정 - {characterName}</DialogTitle>
          <DialogDescription>
            해당 캐릭터의 대한 설정을 변경 및 확인할 수 있습니다
          </DialogDescription>

          <Divider mt="4" mb="2" borderColor="border" />
        </DialogHeader>

        <VerticalTabsTemplate defaultValue="todo">
          <VerticalTabsTemplate.List w="44">
            <VerticalTabsTemplate.Trigger value="todo">
              레이드 숙제 설정
            </VerticalTabsTemplate.Trigger>
            <VerticalTabsTemplate.Trigger value="etc">기타 설정</VerticalTabsTemplate.Trigger>
          </VerticalTabsTemplate.List>

          <VerticalTabsTemplate.Content minH="80" flex="1" value="todo">
            <Form form={form}>
              <FormField
                control={form.control}
                name="selectedRaidNames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>레이드 숙제</FormLabel>

                    <FormDescription>
                      최대 3개의 숙제를 미리 지정하거나 자동으로 구성할 수 있습니다
                    </FormDescription>

                    <FormControl>
                      <SelectMultiple
                        values={field.value}
                        onValuesChange={handleChangeSelectedRaidNames}
                      >
                        <SelectMultiple.Trigger w="80">
                          <SelectMultiple.Value placeholder="레이드를 선택해주세요" />
                        </SelectMultiple.Trigger>

                        <SelectMultiple.Content>
                          {RAIDS_ARRAY_GROUP_BY_NAME.map(item => (
                            <SelectMultiple.Item key={item.name} value={item.name}>
                              {item.name}
                            </SelectMultiple.Item>
                          ))}
                        </SelectMultiple.Content>
                      </SelectMultiple>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={css({ spaceY: '4' })}>
                {selectedRaidNames.map(name => (
                  <RaidRoot key={name} name={name} />
                ))}
              </div>
            </Form>
          </VerticalTabsTemplate.Content>

          <VerticalTabsTemplate.Content minH="80" flex="1" value="etc">
            <FormHeader
              title="레이드 숙제 설정"
              description="최대 3개의 숙제를 미리 지정하거나 자동으로 구성할 수 있습니다"
              divider={false}
            />

            <Divider mt="4" mb="2" borderColor="border" />
          </VerticalTabsTemplate.Content>
        </VerticalTabsTemplate>
      </DialogContent>
    </Dialog>
  )
}

export default CharacterConfigDialog
