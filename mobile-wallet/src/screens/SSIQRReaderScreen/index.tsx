import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Platform, StatusBar} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';

import {QR_SCANNER_TIMEOUT} from '../../@config/constants';
import SSIQRCustomMarker from '../../components/qrCodes/SSIQRCustomMarker';
import {translate} from '../../localization/Localization';
import {readQr} from '../../services/qrService';
import {SSIFullFlexDirectionRowViewStyled as Container, SSIQRReaderScreenScannerStyled as QRScanner} from '../../styles/components';
import {PlatformsEnum, ScreenRoutesEnum, StackParamList} from '../../types';

type Props = NativeStackScreenProps<StackParamList, ScreenRoutesEnum.QR_READER>;

const SSIQRReaderScreen: FC<Props> = (props: Props): JSX.Element => {
  const onRead = async (readEvent: BarCodeReadEvent): Promise<void> => {
    await readQr({qrData: readEvent.data, navigation: props.navigation});
  };

  if (Platform.OS === PlatformsEnum.ANDROID) {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }

  return (
    <Container>
      <QRScanner
        onRead={onRead}
        reactivate
        reactivateTimeout={QR_SCANNER_TIMEOUT.reactivate}
        containerStyle={{backgroundColor: 'black'}}
        showMarker
        customMarker={<SSIQRCustomMarker title={translate('qr_scanner_marker_title')} subtitle={translate('qr_scanner_marker_subtitle')} />}
        cameraProps={{
          flashMode: RNCamera.Constants.FlashMode.auto,
        }}
      />
    </Container>
  );
};

export default SSIQRReaderScreen;
